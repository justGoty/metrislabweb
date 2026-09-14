// Local build under a simulated production origin. Every request is intercepted;
// the SDK and PHP are mocks: no real Metrica hits, enquiries or email.
// playwright-cli run-code --filename scripts/analytics-browser-checks.js
async (page) => {
  const base = 'https://metrislab.ru';
  const local = 'http://127.0.0.1:4173';
  const key = 'metrislab.analytics.v1';
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const context = await page.context().browser().newContext({ viewport: { width: 390, height: 844 } });
  let sdkRequests = 0;
  let formRequests = 0;
  let sdkMode = 'ok';
  let pendingSdk;
  let reply = { status: 500, body: { ok: false, error: 'Mock server error' } };
  const unexpectedRequests = [];
  const errors = [];
  const sdk = 'window.__metrikaCalls=[]; window.ym=(...args)=>window.__metrikaCalls.push(args);';
  await context.route('**/*', async route => {
    const url = route.request().url();
    if (url.startsWith('https://mc.yandex.ru/metrika/tag.js?')) {
      sdkRequests++;
      if (sdkMode === 'error') return route.abort();
      if (sdkMode === 'pending') { pendingSdk = route; return; }
      return route.fulfill({ contentType: 'application/javascript', body: sdk });
    }
    if (url === `${base}/api/contact.php`) {
      formRequests++;
      return route.fulfill({ status: reply.status, contentType: 'application/json', body: JSON.stringify(reply.body) });
    }
    if (url.startsWith(`${base}/`) && route.request().method() === 'GET') {
      return route.fulfill({ response: await route.fetch({ url: local + url.slice(base.length) }) });
    }
    unexpectedRequests.push(url);
    return route.abort();
  });
  const p = await context.newPage();
  p.on('pageerror', error => errors.push(error.message));
  const button = name => p.getByRole('button', { name, exact: true });
  const calls = () => p.evaluate(() => window.__metrikaCalls || []);
  const goals = async name => (await calls()).filter(call => call[1] === 'reachGoal' && call[2] === name);
  const settings = async () => { await button('Настройки аналитики').click(); };
  const fresh = async () => {
    await p.goto(base);
    await p.evaluate(key => localStorage.removeItem(key), key);
    await p.reload();
    await button('Разрешить аналитику').waitFor();
  };
  const fillForm = async () => {
    await p.locator('[name="name"]').fill('Test Person PRIVATE');
    await p.locator('[name="phone"]').fill('+7 900 000 00 00');
    await p.locator('[name="email"]').fill('private@example.test');
    await p.locator('[name="request"]').fill('PRIVATE enquiry');
    await p.locator('[name="privacy_consent"]').check();
  };
  try {
    await p.goto(`${base}/?model=PRIVATE&email=private%40example.test&utm_source=yandex&utm_medium=cpc&utm_campaign=metris_search_123&utm_content=ad_12_group_34&utm_term=PRIVATE&yclid=12345#contact`);
    await button('Разрешить аналитику').waitFor();
    assert(sdkRequests === 0, 'SDK loaded before consent');
    for (const width of [320, 390, 1440]) {
      await p.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
      await p.evaluate(() => scrollTo(0, 0));
      assert(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Consent overflow at ${width}`);
      const overflow = await p.locator('[aria-labelledby="analytics-title"] button').evaluateAll(elements => elements.some(el => el.scrollWidth > el.clientWidth + 1));
      assert(!overflow, `Consent button overflow at ${width}`);
      await p.screenshot({ path: `output/playwright/analytics-consent-${width}.png` });
    }
    await button('Разрешить аналитику').click();
    await p.waitForFunction(() => window.__metrikaCalls?.some(call => call[1] === 'hit'));
    let recorded = await calls();
    assert(sdkRequests === 1 && recorded.filter(call => call[1] === 'init').length === 1, 'Duplicate initialization');
    const init = recorded.find(call => call[1] === 'init');
    assert(init[0] === 112569603 && init[2].defer && !init[2].webvisor && !init[2].trackLinks && !init[2].clickmap && !init[2].ecommerce && init[2].disableYtm, 'Unsafe counter settings');
    assert(!JSON.stringify(recorded).includes('PRIVATE') && !JSON.stringify(recorded).includes('example.test'), 'Query data leaked');
    assert(recorded.find(call => call[1] === 'hit')[2].includes('utm_campaign=metris_search_123'), 'Attribution lost');
    await p.evaluate(() => document.addEventListener('click', event => {
      if (event.target.closest('a[href^="tel:"],a[href^="mailto:"]')) event.preventDefault();
    }));
    await p.locator('footer a[href^="tel:"]').click();
    await p.locator('footer a[href^="mailto:"]').click();
    assert((await goals('contact_phone_click')).length === 1 && (await goals('contact_email_click')).length === 1, 'Contact goal mismatch');
    await fillForm();
    assert((await goals('lead_form_start')).length === 1, 'Form start duplicated');
    await button('Отправить инженеру').click();
    await p.getByRole('alert').waitFor();
    assert((await goals('lead_submit_success')).length === 0, 'HTTP failure counted as a lead');
    reply = { status: 200, body: { ok: false, error: 'Mock rejected' } };
    await button('Отправить инженеру').click();
    await p.getByText('Mock rejected', { exact: true }).waitFor();
    assert((await goals('lead_submit_success')).length === 0, 'Rejected response counted as a lead');
    reply = { status: 200, body: { ok: true } };
    await button('Отправить инженеру').click();
    await p.getByRole('heading', { name: 'Заявка отправлена', exact: true }).waitFor();
    assert((await goals('lead_submit_success')).length === 1, 'Missing or duplicate success goal');
    recorded = await calls();
    assert(!JSON.stringify(recorded).includes('PRIVATE') && !JSON.stringify(recorded).includes('example.test'), 'Form data leaked');
    assert(recorded.filter(call => call[1] === 'reachGoal').every(call => call.length === 3), 'Unexpected goal parameters');
    await p.evaluate(() => { document.cookie = '_ym_uid=test; path=/'; localStorage.setItem('_ym_test', 'test'); });
    await settings();
    await button('Без аналитики').click();
    assert((await calls()).filter(call => call[1] === 'destruct').length === 1, 'Counter not stopped');
    assert(await p.evaluate(() => !document.cookie.includes('_ym_uid') && localStorage.getItem('_ym_test') === null), 'Analytics storage remained');
    await p.locator('footer a[href^="tel:"]').click();
    assert((await goals('contact_phone_click')).length === 1, 'Goal after withdrawal');
    await p.reload();
    assert(sdkRequests === 1, 'SDK loaded with saved denial');
    await button('Настройки аналитики').waitFor();
    assert(!await button('Разрешить аналитику').isVisible(), 'Denial not persisted');

    await fresh();
    sdkMode = 'pending';
    await button('Разрешить аналитику').click();
    await p.waitForFunction(() => !!document.getElementById('metrislab-metrika'));
    await settings();
    await button('Без аналитики').click();
    assert(pendingSdk, 'Pending SDK route not captured');
    await pendingSdk.fulfill({ contentType: 'application/javascript', body: sdk });
    await p.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert((await calls()).length === 0, 'Late SDK initialized after withdrawal');

    sdkMode = 'error';
    await fresh();
    await button('Разрешить аналитику').click();
    await p.locator('#metrislab-metrika').waitFor({ state: 'detached' });
    await fillForm();
    await button('Отправить инженеру').click();
    await p.getByRole('heading', { name: 'Заявка отправлена', exact: true }).waitFor();

    sdkMode = 'ok';
    await p.evaluate(key => localStorage.setItem(key, JSON.stringify({ version: 1, value: 'granted', expiresAt: Date.now() - 1 })), key);
    const beforeExpiry = sdkRequests;
    await p.reload();
    await button('Разрешить аналитику').waitFor();
    assert(sdkRequests === beforeExpiry, 'Expired consent loaded SDK');
    await p.evaluate(key => localStorage.setItem(key, 'invalid-json'), key);
    await p.reload();
    await button('Разрешить аналитику').waitFor();
    await button('Разрешить аналитику').click();
    await p.waitForFunction(() => window.__metrikaCalls?.some(call => call[1] === 'hit'));
    const second = await context.newPage();
    await second.goto(base);
    await second.getByRole('button', { name: 'Настройки аналитики', exact: true }).click();
    await second.getByRole('button', { name: 'Без аналитики', exact: true }).click();
    await p.waitForFunction(() => window.__metrikaCalls?.some(call => call[1] === 'destruct'));
    await second.close();

    const offline = await context.newPage();
    await offline.addInitScript(() => {
      Storage.prototype.getItem = () => { throw new Error('blocked'); };
      Storage.prototype.setItem = () => { throw new Error('blocked'); };
    });
    await offline.goto(base);
    await offline.getByRole('button', { name: 'Разрешить аналитику', exact: true }).click();
    await offline.waitForFunction(() => window.__metrikaCalls?.some(call => call[1] === 'hit'));
    await offline.close();
    assert(unexpectedRequests.length === 0, `Unexpected requests: ${unexpectedRequests}`);
    assert(errors.length === 0, `Browser errors: ${errors}`);
    return { consent: true, rejection: true, withdrawal: true, expiredConsent: true, storageBlocked: true,
      storageSync: true, lateSdk: true, sdkFailure: true, privateDataExcluded: true, fourGoals: true,
      formRequests, realRequests: 0, screenshots: [320, 390, 1440], errors };
  } finally { await context.close(); }
}
