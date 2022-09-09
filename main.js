const puppeteer = require('puppeteer');
	
(async () => {
    const browser = await puppeteer.launch({headless: false}); 
    const page = await browser.newPage();
    await page.goto('https://u.gg/lol/champions/katarina/build?region=euw1');
    await page.click('button[mode=primary]');
    await page.evaluate(async() => {
        await new Promise(function(resolve) { 
               setTimeout(resolve, 2000)
        });
    });
    await page.setViewport({
        width: 1920,
        height: 1080,
      });
      await page.evaluate(async() => {
        await new Promise(function(resolve) { 
               setTimeout(resolve, 4000)
        });
    });
    await page.click('#close-div-gpt-ad-sticky-bottom');
    const select = await page.waitForSelector("div.champion-recommended-build div.media-query_DESKTOP_MEDIUM__DESKTOP_LARGE")
    await select.screenshot({path: "../scrap/build.png"})

  await browser.close();  


})();

return;
    



