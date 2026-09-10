// Read-only production check: playwright-cli run-code --filename scripts/production-browser-checks.js
async (page) => {
  const base = 'https://metrislab.ru';
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const errors = [];
  const external = [];
  const blocked = [];
  const onError = error => errors.push(error.message);
  const onFailure = request => errors.push(`${request.url()}: ${request.failure()?.errorText}`);
  const guard = async route => {
    const request = route.request();
    if (request.method() !== 'GET') {
      blocked.push(request.method());
      return route.abort();
    }
    if (!request.url().startsWith(`${base}/`)) external.push(request.url());
    return route.continue();
  };
  page.on('pageerror', onError);
  page.on('requestfailed', onFailure);
  await page.route('**/*', guard);
  try {
    for (const [width, height] of [[320, 740], [390, 844], [1440, 900]]) {
      await page.setViewportSize({ width, height });
      for (const [route, name] of [['/', 'home'], ['/catalog/', 'catalog'], ['/privacy/', 'privacy']]) {
        const response = await page.goto(`${base}${route}`);
        assert(response.status() === 200, `${route}: HTTP error`);
        await page.locator('h1').waitFor();
        await page.evaluate(() => document.fonts.ready);
        const layout = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          fonts: ['500 16px Onest', '600 32px Geologica', '400 12px "IBM Plex Mono"'].every(font => document.fonts.check(font, 'МэтрисЛаб')),
        }));
        assert(!layout.overflow, `${route}: overflow at ${width}`);
        assert(layout.fonts, `${route}: fonts not loaded`);
        const images = await page.locator('img').evaluateAll(async elements => {
          const failed = [];
          for (const img of elements) {
            img.loading = 'eager';
            try { await img.decode(); } catch { failed.push(img.src); }
          }
          return failed;
        });
        assert(images.length === 0, `Broken images: ${images}`);
        if (width !== 320) await page.screenshot({ path: `output/playwright/production-${name}-${width}.png`, fullPage: true });
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/catalog/`);
    assert(await page.locator('article').count() === 4, 'Initial models');
    await page.getByRole('button', { name: 'Портативные', exact: true }).click();
    assert(await page.locator('article').count() === 2, 'Portable filter');
    await page.locator('#catalog-search').fill('КИП-МГ4');
    assert(await page.locator('article').count() === 1, 'Model search');
    await page.locator('#kip-mg4 a').click();
    await page.waitForURL('**/?model=*#contact');
    assert((await page.locator('textarea[name="request"]').inputValue()).startsWith('КИП-МГ4'), 'Model prefill');
    assert(await page.getByRole('link', { name: 'Позвонить: +7 906 079 91 44', exact: true }).isVisible(), 'Mobile phone');
    await page.getByRole('button', { name: 'Открыть меню', exact: true }).click();
    assert(await page.getByRole('dialog').isVisible(), 'Mobile menu');
    await page.keyboard.press('Escape');
    assert(!await page.getByRole('dialog').isVisible(), 'Menu close');
    assert(errors.length === 0, errors.join('\n'));
    assert(external.length === 0, `External runtime requests: ${external}`);
    assert(blocked.length === 0, 'Unexpected non-GET request');
    await page.goto(base);
    return { viewports: 9, images: true, localFonts: true, mobileMenu: true, catalog: true, modelPrefill: true, requests: 'GET only', errors };
  } finally {
    page.off('pageerror', onError);
    page.off('requestfailed', onFailure);
    await page.unroute('**/*', guard);
  }
}
