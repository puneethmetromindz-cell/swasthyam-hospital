import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  page.on('response', response => {
    if (response.request().resourceType() === 'image') {
      console.log(`IMAGE RESPONSE: ${response.status()} ${response.url()}`);
    }
  });

  await page.goto('http://localhost:5173/specialties', { waitUntil: 'networkidle0' });

  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      width: img.width,
      height: img.height,
      visible: img.offsetParent !== null
    }));
  });

  console.log(JSON.stringify(images, null, 2));

  await browser.close();
})();
