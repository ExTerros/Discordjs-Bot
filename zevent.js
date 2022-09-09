    const puppeteer = require('puppeteer');
    const fs = require('node:fs');

    const zapi = require('zevent-api');
    zapi.viewersCount((viwers) => {

    zapi.donnationAmount((amount) => {
    zapi.getOnline((online) => {
        const s = new Array();
        online.forEach((on) => {
            s.push(on.display+" ("+on.game+")");
        });
        console.log(amount.formatted);

		
    
            var ZeventChiffre = new Object();
            ZeventChiffre.StreamerEnLigne = online.length;
            ZeventChiffre.ViwerEnLigne  = viwers.formatted;
            ZeventChiffre.TotalDon = amount.formatted;
                
    
            fs.writeFile('./scrap/ZeventStats.json', JSON.stringify(ZeventChiffre, null, 3), (err)=>{
                if(err)
                console.log(err);
            })
    });
    });
    });  


    return;
        
        



    