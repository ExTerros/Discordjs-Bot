function updateNewsLOLPatch(){

const puppeteer = require('puppeteer');
const fs = require('node:fs');

	
		(async () => {
			const browser = await puppeteer.launch({headless: true}); 
			const page = await browser.newPage();
			await page.goto('https://www.leagueoflegends.com/fr-fr/news/tags/patch-notes/');
	
			console.log('Update Status')
	
			var ListNewPatch = await page.evaluate(()=>{
	
				var NewPatch = { "title":[], "src":[], "img": []}
				var elements = document.querySelectorAll('.style__List-sc-106zuld-2 .style__Item-sc-106zuld-3');
	
				for (let index = 0; index < 3; index++) {   
					
					NewPatch["title"].push(elements[index].querySelector('.style__Title-sc-1h41bzo-8').textContent)
					NewPatch["src"].push(elements[index].querySelector('.style__Wrapper-sc-1h41bzo-0').href )
					NewPatch["img"].push(elements[index].querySelector('.style__ImageWrapper-sc-1h41bzo-5 img').src )

					
				}
				return NewPatch 
			});
			
			fs.writeFile('./scrap/LolPatchUpdate.json', JSON.stringify(ListNewPatch, null, 4), (err)=>{
				if(err)
				console.log(err);
			})
			
			await browser.close();  
	
		})();
	
		return;

  }

  function EnvoieNotifNewsLOLPatch(){
    var listUpdate = JSON.parse(fs.readFileSync('./scrap/LolPatchUpdate.json', 'utf-8'))
    var listJson = JSON.parse(fs.readFileSync('./scrap/LolPatch.json', 'utf-8'))
    console.log(listJson["title"][0]);
    console.log(listUpdate["title"][1]);
      //si 1 video a été ajouté
      if ( listJson["src"][0] === listUpdate["src"][1] && listJson["src"][1] === listUpdate["src"][2]) {
        console.log('Nouveau Patch lol');
        
        const frEmbed = new EmbedBuilder()
          .setColor('#FFDC00')
					.setAuthor({ name: 'Patch League of Legends', iconURL: 'https://www.leagueoflegends.com/static/logo-1200-589b3ef693ce8a750fa4b4704f1e61f2.png' })
          .setTitle(listUpdate["title"][0])
          .setURL(listUpdate["src"][0])
          .setThumbnail(listUpdate["img"][0])
          .setTimestamp()

        client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })
  
        WriteFiles('./scrap/LolPatch.json', listUpdate);
      }
      //si 2 videos publiées
      else if ( listJson["src"][0] == listUpdate["src"][2]) {
        console.log('2 Nouveau Patch lol');
        
        const frEmbed = new EmbedBuilder()
          .setColor('#FFDC00')
					.setAuthor({ name: 'Patch League of Legends', iconURL: 'https://www.leagueoflegends.com/static/logo-1200-589b3ef693ce8a750fa4b4704f1e61f2.png' })
          .setTitle(listUpdate["title"][0])
          .setURL(listUpdate["src"][0])
          .setThumbnail(listUpdate["img"][0])
          .setTimestamp()

        client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })

        WriteFiles('./scrap/LolPatch.json', listUpdate);
      }
      else{
        console.log('Pas de Nouveau patch lol');
        WriteFiles('./scrap/LolPatch.jsonn', listUpdate);
      }
      
      return null;
  
    }	