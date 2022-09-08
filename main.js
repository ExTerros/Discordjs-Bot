    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({headless: true}); 
        const page = await browser.newPage();
        await page.goto('https://u.gg/lol/champions/rammus/build?region=euw1');


        
        await page.click('button[mode=primary]');
        


        const tier = await page.evaluate(() => {
            const tier = document.querySelector(".champion-tier .tier");
            const tierText = tier.innerText;
        
            return tierText;
          });
          const Win = await page.evaluate(() => {
            const Win = document.querySelector(".win-rate .value");
            const WinText = Win.innerText;
        
            return WinText;
          });
          const Rank = await page.evaluate(() => {
            const Rank = document.querySelector(".overall-rank .value");
            const RankText = Rank.innerText;
        
            return RankText;
          });
          const Pick = await page.evaluate(() => {
            const Pick = document.querySelector(".pick-rate .value");
            const PickText = Pick.innerText;
        
            return PickText;
          });
          const Ban = await page.evaluate(() => {
            const Ban = document.querySelector(".ban-rate .value");
            const BanText = Ban.innerText;
        
            return BanText;
          });
          const Matches = await page.evaluate(() => {
            const Matches = document.querySelector(".matches .value");
            const MatchesText = Matches.innerText;
        
            return MatchesText;
          });
        
          console.log(tier,' Tier');
          console.log(Win,' Win Rate');
          console.log(Rank,' Rank');
          console.log(Pick,' Pick Rate');
          console.log(Ban,' Ban Rate');
          console.log(Matches,' Matches');



        
          await browser.close();
        

    })();



    