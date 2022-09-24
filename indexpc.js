// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require('puppeteer');
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { tokenDev, channelNews } = require('./config.json');




// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.log(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
 
	/****************************************************
    ***************** PATCH LOL UPDATE ******************
    ****************************************************/

	async function updateNewsLOLPatch(){

		
				(async () => {
				const browser = await puppeteer.launch({headless: true,	args: ['--no-sandbox']});

					const page = await browser.newPage();
					await page.goto('https://www.leagueoflegends.com/fr-fr/news/tags/patch-notes/');
					
					
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
				WriteFiles('./scrap/LolPatch.json', listUpdate);
			  }
			  
			  return null;
		  
			}	

	/****************************************************
    ************** END OF PATCH LOL UPDATE **************
    ****************************************************/

   /****************************************************
    ************* ZEVENT CHANNEL UPDATE ****************
    ****************************************************/	
   
    // async function UpdateZevent(){
	// 	const zapi = require('zevent-api');

	// 	zapi.viewersCount((viwers) => {
	// 	zapi.donnationAmount((amount) => {
	// 	zapi.getOnline((online) => {
	// 		const s = new Array();
	// 		online.forEach((on) => {
	// 			s.push(on.display+" ("+on.game+")");
	// 		});
	// 		console.log(amount.formatted);
	
			
		
	// 			var ZeventChiffre = new Object();
	// 			ZeventChiffre.StreamerEnLigne = [online.length]
	// 			ZeventChiffre.ViwerEnLigne  = viwers.formatted;
	// 			ZeventChiffre.TotalDon = amount.formatted;
					
		
	// 			fs.writeFile('./scrap/ZeventStats.json', JSON.stringify(ZeventChiffre, null, 3), (err)=>{
	// 				if(err)
	// 				console.log(err);
	// 			})
	// 	});
	// 	});
	// 	});  
	
	
	// 	return;
			
	// 	}

	// function UpdateCanvaZevent(){
	
	// 	(async () => {
	// 	const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser',
	// 	args: [
	// 		'--disable-setuid-sandbox',
	// 		'--no-sandbox',
	// 		'--disable-gpu',
	// 		'--no-first-run',
			
	// 	]}); 

	// 		const page = await browser.newPage();
	// 		await page.goto('https://place.zevent.fr');
	// 		page.click('.board-state')
	// 		await page.evaluate(async() => {
	// 			await new Promise(function(resolve) { 
	// 				   setTimeout(resolve, 2000)
	// 			});
	// 		});
	// 		await page.setViewport({
	// 			width: 1920,
	// 			height: 1080,
	// 			deviceScaleFactor: 10
	// 		  });
	// 		const select = await page.waitForSelector("div.game-container__inner img:nth-child(2)")
	// 		await select.screenshot({path: "./assets/zeventcanva.png"})
	
	// 			await browser.close();  
	  
	
	// 	})();
	
	// 	return;
	// }
		
		
	// function EnvoieZevent(){
	// 	const { AttachmentBuilder } = require('discord.js');
	// 	const file = new AttachmentBuilder('./assets/zeventcanva.png');
	// 		var listZevent = fs.readFileSync('./scrap/ZeventStats.json', 'utf-8')
	// 				console.log(listZevent);
	// 				const strListZevent = listZevent.replace('{','').replace('}','').replace('StreamerEnLigne','Streamer En Ligne ').replace('ViwerEnLigne','Viwer En Ligne ').replace('TotalDon','Total De Don ').replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('"',"").replace('[',"").replace(']',"").replace(',',"").replace(',',"")
	// 				const frEmbed = new EmbedBuilder()
	// 					.setColor('#47e014')
	// 					.setAuthor({ name: 'Informations Zevent', iconURL: 'https://zevent.fr/assets/logo.5cb95698.png' })
	// 					.setThumbnail("https://zevent.fr/assets/logo.5cb95698.png")
	// 					.setDescription(strListZevent)
	// 					.setImage('attachment://zeventcanva.png')
	// 					.setTimestamp()

	// 				client.channels.cache.get(ZeventNews).send({ embeds: [frEmbed], files: [file] })
	// 				client.channels.cache.get(channelNews).send({ embeds: [frEmbed], files: [file] })

		
					
	// 			return null;
		
	// 		}	

//function WriteFile and Interval
		
setInterval(function(){
	updateNewsLOLPatch()
	// UpdateCanvaZevent()
	// UpdateZevent()

	console.log('set timer');
	setTimeout(function(){EnvoieNotifNewsLOLPatch();}, 30000)
	// setTimeout(function(){EnvoieZevent();}, 30000)


}, 600000) //1200000

function WriteFiles(file, data){

fs.writeFile(file, JSON.stringify(data, null, 4), (err)=>{ 		
if(err)
console.log(err)
})

}
// Login to Discord with your client's tokenDev
client.login(tokenDev);