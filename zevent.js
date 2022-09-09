    const puppeteer = require('puppeteer');
	
    (async () => {
        const browser = await puppeteer.launch({headless: true}); 
        const page = await browser.newPage();
        await page.goto('https://place.zevent.fr');
        page.click('.board-state')
        await page.evaluate(async() => {
            await new Promise(function(resolve) { 
                   setTimeout(resolve, 2000)
            });
        });
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 10
          });
        const select = await page.waitForSelector("div.game-container__inner img:nth-child(2)")
        await select.screenshot({path: "zeventcanva.png"})

			await browser.close();  
  

    })();

    return;
        



    