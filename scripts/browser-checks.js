// Run with playwright-cli run-code --filename scripts/browser-checks.js against npm run preview on 4173.
async (page) => {
  const base = 'http://127.0.0.1:4173';
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const errors = [];
  const onError = error => errors.push(error.message);
  const onConsole = message => { if (message.type() === 'error') errors.push(message.text()); };
  page.on('pageerror', onError);
  page.on('console', onConsole);
  await page.goto(base);
  await page.evaluate(() => localStorage.removeItem('i18nextLng'));

  for (const [width, height] of [[320, 740], [390, 844], [768, 1024], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    for (const [path, name] of [['/', 'home'], ['/catalog/', 'catalog'], ['/privacy/', 'privacy'], ['/404.html', '404']]) {
      await page.goto(`${base}${path}`);
      await page.locator('h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => {
        const overflow = [...document.querySelectorAll('h1, h2, h3, p, button, header > div > a')].filter(el => {
          const box = el.getBoundingClientRect();
          return box.width > 0 && (box.left < -1 || box.right > innerWidth + 1 || el.scrollWidth > el.clientWidth + 2);
        }).map(el => el.textContent.slice(0, 90));
        return { width: document.documentElement.scrollWidth, viewport: innerWidth, overflow };
      });
      assert(layout.width <= width, `Horizontal scroll: ${name} at ${width}`);
      assert(layout.overflow.length === 0, `Text overflow: ${name} at ${width}: ${layout.overflow.join('; ')}`);
      const images = await page.locator('img').evaluateAll(async elements => {
        return Promise.all(elements.map(async img => {
          img.loading = 'eager';
          try { await img.decode(); return true; } catch { return img.src; }
        }));
      });
      assert(images.every(image => image === true), `Broken images: ${images.filter(image => image !== true)}`);
      if (width === 390 || width === 1440) await page.screenshot({ path: `output/playwright/${name}-${width}.png`, fullPage: true });
    }
  }
  console.log('Layout: 16 page/viewport combinations, all images loaded, no text overflow');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  assert(await page.getByRole('link', { name: 'Позвонить: +7 906 079 91 44', exact: true }).isVisible(), 'Mobile phone not visible');
  await page.getByRole('button', { name: 'Открыть меню', exact: true }).click();
  const dialog = page.getByRole('dialog');
  assert(await dialog.isVisible(), 'Menu missing');
  await page.keyboard.press('Shift+Tab');
  assert(await dialog.getByRole('button', { name: 'EN', exact: true }).evaluate(el => el === document.activeElement), 'Focus escaped mobile dialog');
  await page.keyboard.press('Escape');
  assert(await page.getByRole('button', { name: 'Открыть меню', exact: true }).evaluate(el => el === document.activeElement), 'Menu did not restore focus');

  await page.goto(`${base}/catalog/`);
  assert(await page.locator('article').count() === 4, 'Initial catalog count');
  await page.getByRole('button', { name: 'Портативные', exact: true }).click();
  assert(await page.locator('article').count() === 2, 'Portable filter count');
  await page.locator('#catalog-search').fill('КИП-МГ4');
  assert(await page.locator('article').count() === 1, 'Model search count');
  await page.locator('#catalog-search').fill('not-a-real-model');
  assert(await page.locator('article').count() === 0, 'Unknown query not empty');
  await page.getByRole('button', { name: 'Сбросить фильтры', exact: true }).first().click();
  await page.locator('#catalog-manufacturer').selectOption('STA');
  assert(await page.locator('article').count() === 1, 'Manufacturer filter count');
  await page.locator('#catalog-manufacturer').selectOption('all');
  await page.locator('#kip-mg4 a').click();
  await page.waitForURL('**/?model=*#contact');
  assert((await page.locator('textarea[name="request"]').inputValue()).startsWith('КИП-МГ4'), 'Model prefill failed');
  await page.getByRole('button', { name: 'Открыть меню', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'EN', exact: true }).click();
  await page.reload();
  await page.waitForFunction(() => document.documentElement.lang === 'en');
  assert(await page.locator('html').getAttribute('lang') === 'en', 'Saved language was lost');
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'RU', exact: true }).click();
  console.log('Interactions: mobile menu, focus, 3 catalog filters, empty state, prefill, saved language');

  let sent = 0;
  await page.route(`${base}/api/contact.php`, async route => {
    sent += 1;
    const body = route.request().postData() || '';
    const match = body.match(/name="started_at"\r\n\r\n(\d+)/);
    assert(match && Math.abs(Date.now() - Number(match[1])) < 300000, 'Form contains a stale build timestamp');
    await route.fulfill({
      status: sent === 1 ? 500 : 200,
      contentType: 'application/json',
      body: JSON.stringify(sent === 1 ? { ok: false, error: 'Тест: сервер временно недоступен' } : { ok: true }),
    });
  });
  try {
    const attachFile = async (name, type, size) => page.locator('input[name="attachment"]').evaluate((input, file) => {
      const transfer = new DataTransfer();
      transfer.items.add(new File([new Uint8Array(file.size)], file.name, { type: file.type }));
      input.files = transfer.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, { name, type, size });
    await attachFile('invalid.txt', 'text/plain', 10);
    await page.getByText('Допустимы только JPG, PNG, WEBP и PDF.', { exact: true }).waitFor();
    await attachFile('too-large.pdf', 'application/pdf', 5 * 1024 * 1024 + 1);
    await page.getByText('Файл превышает 5 МБ.', { exact: true }).waitFor();
    await attachFile('local-test.pdf', 'application/pdf', 16);
    await page.getByText('local-test.pdf', { exact: true }).waitFor();
    await page.locator('input[name="name"]').fill('Техническая проверка');
    await page.locator('input[name="phone"]').fill('00000000000000000000');
    await page.locator('textarea[name="request"]').fill('Локальная проверка, письмо не отправляется');
    await page.locator('input[name="privacy_consent"]').check();
    await page.getByRole('button', { name: 'Отправить инженеру', exact: true }).click();
    assert(sent === 0, 'Invalid phone reached the backend');
    assert(await page.getByRole('alert').isVisible(), 'Missing phone error');
    await page.locator('input[name="phone"]').fill('+7 900 000 00 00');
    await page.getByRole('button', { name: 'Отправить инженеру', exact: true }).click();
    await page.getByText('Тест: сервер временно недоступен', { exact: true }).waitFor();
    assert(await page.locator('input[name="name"]').inputValue() === 'Техническая проверка', 'Error lost form values');
    await page.screenshot({ path: 'output/playwright/form-error-390.png', fullPage: true });
    await page.getByRole('button', { name: 'Отправить инженеру', exact: true }).click();
    await page.getByRole('heading', { name: 'Заявка отправлена', exact: true }).waitFor();
    assert(sent === 2, 'Unexpected number of mocked requests');
    await page.getByRole('button', { name: 'Отправить ещё одну', exact: true }).click();
    assert(await page.locator('input[name="name"]').inputValue() === '', 'Form reset failed');
  } finally {
    await page.unroute(`${base}/api/contact.php`);
  }
  console.log('Form: invalid phone blocked, HTTP error retains values, success/reset; 2 mocked requests, no email sent');

  const noJs = await page.context().browser().newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const staticPage = await noJs.newPage();
    await staticPage.goto(base);
    assert(await staticPage.getByRole('heading', { level: 1 }).isVisible(), 'No-JS H1 hidden');
    assert(await staticPage.locator('#about').isVisible(), 'No-JS content hidden');
    assert(await staticPage.locator('#contact button[type="submit"]').isDisabled(), 'No-JS form can submit stale data');
    const opacity = await staticPage.locator('#about [class*="reveal"]').first().evaluate(el => getComputedStyle(el).opacity);
    assert(opacity === '1', 'No-JS reveal content invisible');
    await staticPage.goto(`${base}/catalog/`);
    assert(await staticPage.locator('article').count() === 4, 'No-JS catalog missing');
    await staticPage.screenshot({ path: 'output/playwright/catalog-no-js.png', fullPage: true });
  } finally { await noJs.close(); }
  page.off('pageerror', onError);
  page.off('console', onConsole);
  // The deliberately mocked HTTP 500 produces a browser resource error.
  const unexpected = errors.filter(error => !error.includes('500 (Internal Server Error)'));
  assert(unexpected.length === 0, `Browser/hydration errors: ${unexpected.join('\n')}`);
  await page.goto(base);
  console.log('No-JS content verified; no unexpected browser or hydration errors');
  return { layouts: 16, catalogFilters: true, mobileFocus: true, modelPrefill: true, savedLanguage: true, mockedFormRequests: sent, noJs: true, unexpectedErrors: unexpected };
}
