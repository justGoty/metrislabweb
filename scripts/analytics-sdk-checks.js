// Downloads the official SDK, but intercepts ALL telemetry and all website requests.
// No test visit or goal is delivered to Metrica and no mail is sent.
async (page) => {
  const base = 'https://metrislab.ru';
  const ctx = await page.context().browser().newContext();
  const telemetry = [];
  const errors = [];
  let phase = 'load';
  await ctx.route('**/*', async route => {
    const request = route.request();
    const url = request.url();
    if (url.startsWith('https://mc.yandex.ru/metrika/tag.js?')) return route.continue();
    if (url.startsWith(`${base}/`) && request.method() === 'GET') {
      return route.fulfill({ response: await route.fetch({ url: 'http://127.0.0.1:4173' + url.slice(base.length) }) });
    }
    telemetry.push({ url, body: request.postData() || '' });
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{"settings":{}}', headers: { 'Access-Control-Allow-Origin': base, 'Access-Control-Allow-Credentials': 'true' } });
  });
  try {
    const p = await ctx.newPage();
    p.on('pageerror', error => errors.push(error.message));
    p.on('requestfailed', request => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
    await p.goto(`${base}/?email=PRIVATE_EMAIL&model=PRIVATE_MODEL#PRIVATE_HASH`);
    await p.getByRole('button', { name: 'Разрешить аналитику', exact: true }).waitFor();
    if (telemetry.length) throw new Error('SDK telemetry before consent');
    phase = 'hit';
    const hit = p.waitForRequest(request => request.url().includes('/watch/112569603'));
    await p.getByRole('button', { name: 'Разрешить аналитику', exact: true }).click();
    await hit;
    await p.evaluate(() => document.addEventListener('click', event => {
      if (event.target.closest('a[href^="tel:"]')) event.preventDefault();
    }));
    phase = 'goal';
    const goal = p.waitForRequest(request => decodeURIComponent(request.url() + (request.postData() || '')).includes('contact_phone_click'));
    await p.locator('footer a[href^="tel:"]').click();
    await goal;
    const decoded = telemetry.map(item => decodeURIComponent(item.url + item.body));
    if (decoded.some(item => /PRIVATE_(EMAIL|MODEL|HASH)/.test(item))) throw new Error('SDK transmitted unsanitized URL');
    if (errors.length) throw new Error(errors.join('\n'));
    await p.getByRole('button', { name: 'Настройки аналитики', exact: true }).click();
    await p.getByRole('button', { name: 'Без аналитики', exact: true }).click();
    return { passed: true, realSdk: true, interceptedTelemetryRequests: telemetry.length, realTelemetrySent: 0, sanitized: true, goal: true, errors };
  } catch (error) {
    return { passed: false, phase, error: error.message, interceptedTelemetryRequests: telemetry.length, errors };
  } finally { await ctx.close(); }
}
