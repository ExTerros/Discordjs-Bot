// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token, channelNews } = require('./config.json');



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
		console.log('error');
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

	/****************************************************
    ************ NEWS CHANNEL TOPIC UPDATE **************
    ****************************************************/	

	async function updateNewsTopics(){
		const puppeteer = require('puppeteer');
		
			(async () => {
				const browser = await puppeteer.launch({headless: true}); 
				const page = await browser.newPage();
				await page.goto('https://fr.finalfantasyxiv.com/lodestone/topics/');
		
				console.log('UpdateTopics')
		
				var ListNewsTopics = await page.evaluate(()=>{
		
					var NewsTopics = { "title":[], "src":[], "file": [], "date": [], "text": []}
					var elements = document.querySelectorAll('.news__content ul .ic__topics--list');
		
					for (let index = 0; index < 3; index++) {   
						
						NewsTopics["title"].push(elements[index].querySelector('.news__list--title a').textContent)
						NewsTopics["src"].push(elements[index].querySelector('.news__list--banner a').href )
						NewsTopics["file"].push(elements[index].querySelector('.news__list--img img').src )
						NewsTopics["text"].push(elements[index].querySelector('.mdl-text__xs-m16').textContent )
						NewsTopics["date"].push(elements[index].querySelector('.news__list--time span').textContent )
						
					}
					return NewsTopics 
				});
				
				fs.writeFile('./scrap/NewsTopicsUpdate.json', JSON.stringify(ListNewsTopics, null, 4), (err)=>{
					if(err)
					console.log(err);
				})
				
				await browser.close();  
		
			})();
		
			return;
	
		}
		
	function EnvoieNotifNewsTopic(){
			var listUpdate = JSON.parse(fs.readFileSync('./scrap/NewsTopicsUpdate.json', 'utf-8'))
			var listJson = JSON.parse(fs.readFileSync('./scrap/NewsTopics.json', 'utf-8'))
			console.log(listJson["title"][0]);
			console.log(listUpdate["title"][1]);
				//si 1 video a été ajouté
				if ( listJson["src"][0] === listUpdate["src"][1] && listJson["src"][1] === listUpdate["src"][2]) {
					console.log('Nouvelle News Topics');
					
					const frEmbed = new EmbedBuilder()
						.setColor('#4096ee')
						.setAuthor({ name: 'À la une', iconURL: 'https://img.finalfantasyxiv.com/lds/h/0/U2uGfVX4GdZgU1jASO0m9h_xLg.png' })
						.setTitle(listUpdate["title"][0])
						.setURL(listUpdate["src"][0])
						.setDescription(listUpdate["text"][0])
						.setImage(listUpdate["file"][0])
						.setFooter({ text: listUpdate["date"][0], iconURL: 'https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/calendar-color-icon.png' });
	
					client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })
		
					WriteFiles('./scrap/NewsTopics.json', listUpdate);
				}
				//si 2 videos publiées
				else if ( listJson["src"][0] == listUpdate["src"][2]) {
					console.log('2 Nouvelle News Topics');
					
					const frEmbed = new EmbedBuilder()
						.setColor('#4096ee')
						.setAuthor({ name: 'À la une', iconURL: 'https://img.finalfantasyxiv.com/lds/h/0/U2uGfVX4GdZgU1jASO0m9h_xLg.png' })
						.setTitle(listUpdate["title"][0])
						.setURL(listUpdate["src"][0])
						.setDescription(listUpdate["text"][0])
						.setImage(listUpdate["file"][0])
						.setFooter({ text: listUpdate["date"][0], iconURL: 'https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/calendar-color-icon.png' });
	
					client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })
	
					WriteFiles('./scrap/NewsTopics.json', listUpdate);
				}
				else{
					console.log('Pas de Nouvelle News Topics');
					WriteFiles('./scrap/NewsTopics.json', listUpdate);
				}
				
				return null;
		
			}	
		
	/****************************************************
    *********** NEWS CHANNEL NOTICES UPDATE *************
    ****************************************************/	
   
    async function updateNewsNotices(){
        const puppeteer = require('puppeteer');
    
        (async () => {
            const browser = await puppeteer.launch({headless: true}); 
            const page = await browser.newPage();
            await page.goto('https://fr.finalfantasyxiv.com/lodestone/news/category/1');
    
            console.log('Update Notice')
    
            var ListNewsNotices = await page.evaluate(()=>{
    
                var NewsNotices = { "title":[], "src":[], "date": []}
                var elements = document.querySelectorAll('.news__content ul .news__list');
    
                for (let index = 4; index < 7; index++) {   
                    
                    NewsNotices["title"].push(elements[index].querySelector('.news__list--title').textContent)
                    NewsNotices["src"].push(elements[index].querySelector('.news__list a').href )
                    NewsNotices["date"].push(elements[index].querySelector('.news__list--time span').textContent )
                    
                }
                return NewsNotices 
            });
            
            fs.writeFile('./scrap/NewsNoticesUpdate.json', JSON.stringify(ListNewsNotices, null, 4), (err)=>{
                if(err)
                console.log(err);
            })
            
            await browser.close();  
    
        })();
    
        return;
	
		}
		
	function EnvoieNotifNewsNotice(){
			var listUpdate = JSON.parse(fs.readFileSync('./scrap/NewsNoticesUpdate.json', 'utf-8'))
			var listJson = JSON.parse(fs.readFileSync('./scrap/NewsNotices.json', 'utf-8'))
			console.log(listJson["title"][0]);
			console.log(listUpdate["title"][1]);
				//si 1 video a été ajouté
				if ( listJson["src"][0] === listUpdate["src"][1] && listJson["src"][1] === listUpdate["src"][2]) {
					console.log('Nouvelle News Notice');
					
					const frEmbed = new EmbedBuilder()
						.setColor('#4096ee')
						.setAuthor({ name: 'Informations', iconURL: 'https://img.finalfantasyxiv.com/lds/h/0/U2uGfVX4GdZgU1jASO0m9h_xLg.png' })
						.setTitle(listUpdate["title"][0])
						.setURL(listUpdate["src"][0])
						.setFooter({ text: listUpdate["date"][0], iconURL: 'https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/calendar-color-icon.png' });
	
					client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })
		
					WriteFiles('./scrap/NewsNotices.json', listUpdate);
				}
				//si 2 videos publiées
				else if ( listJson["src"][0] == listUpdate["src"][2]) {
					console.log('2 Nouvelle News Notice');
					
					const frEmbed = new EmbedBuilder()
						.setColor('#4096ee')
						.setAuthor({ name: 'Informations', iconURL: 'https://img.finalfantasyxiv.com/lds/h/0/U2uGfVX4GdZgU1jASO0m9h_xLg.png' })
						.setTitle(listUpdate["title"][0])
						.setURL(listUpdate["src"][0])
						.setFooter({ text: listUpdate["date"][0], iconURL: 'https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/calendar-color-icon.png' });
	
					client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })
	
					WriteFiles('./scrap/NewsNotices.json', listUpdate);
				}
				else{
					console.log('Pas de Nouvelle News Notice');
					WriteFiles('./scrap/NewsNotices.json', listUpdate);
				}
				
				return null;
		
			}	

	/****************************************************
    ********* NEWS CHANNEL MAINTENANCE UPDATE ***********
    ****************************************************/	


    async function updateNewsMaintenance(){
        const puppeteer = require('puppeteer');
    
        (async () => {
            const browser = await puppeteer.launch({headless: true}); 
            const page = await browser.newPage();
            await page.goto('https://fr.finalfantasyxiv.com/lodestone/news/category/2');
    
            console.log('UpdateNews Maintenance')
    
            var ListNewsMaintenance = await page.evaluate(()=>{
    
                var NewsMaintenance = { "title":[], "src":[], "date": []}
                var elements = document.querySelectorAll('.news__content ul .news__list');
    
                for (let index = 0; index < 3; index++) {   
                    
                    NewsMaintenance["title"].push(elements[index].querySelector('.news__list--title').textContent)
                    NewsMaintenance["src"].push(elements[index].querySelector('.news__list a').href )
                    NewsMaintenance["date"].push(elements[index].querySelector('.news__list--time span').textContent )
                    
                }
                return NewsMaintenance 
            });
            
            fs.writeFile('./scrap/NewsMaintenanceUpdate.json', JSON.stringify(ListNewsMaintenance, null, 4), (err)=>{
                if(err)
                console.log(err);
            })
            
            await browser.close();  
    
        })();
    
        return;
	
		}
		
	function EnvoieNotifNewsMaintenance(){
			var listUpdate = JSON.parse(fs.readFileSync('./scrap/NewsMaintenanceUpdate.json', 'utf-8'))
			var listJson = JSON.parse(fs.readFileSync('./scrap/NewsMaintenance.json', 'utf-8'))
			console.log(listJson["title"][0]);
			console.log(listUpdate["title"][1]);
				//si 1 video a été ajouté
				if ( listJson["src"][0] === listUpdate["src"][1] && listJson["src"][1] === listUpdate["src"][2]) {
					console.log('Nouvelle News Maintenance');
					
					const frEmbed = new EmbedBuilder()
						.setColor('#4096ee')
						.setAuthor({ name: 'Maintenance', iconURL: 'https://img.finalfantasyxiv.com/lds/h/0/U2uGfVX4GdZgU1jASO0m9h_xLg.png' })
						.setTitle(listUpdate["title"][0])
						.setURL(listUpdate["src"][0])
						.setFooter({ text: listUpdate["date"][0], iconURL: 'https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/calendar-color-icon.png' });
	
					client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })
		
					WriteFiles('./scrap/NewsMaintenance.json', listUpdate);
				}
				//si 2 videos publiées
				else if ( listJson["src"][0] == listUpdate["src"][2]) {
					console.log('2 Nouvelle News Maintenance');
					
					const frEmbed = new EmbedBuilder()
						.setColor('#4096ee')
						.setAuthor({ name: 'Maintenance', iconURL: 'https://img.finalfantasyxiv.com/lds/h/0/U2uGfVX4GdZgU1jASO0m9h_xLg.png' })
						.setTitle(listUpdate["title"][0])
						.setURL(listUpdate["src"][0])
						.setFooter({ text: listUpdate["date"][0], iconURL: 'https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/calendar-color-icon.png' });
	
					client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })
	
					WriteFiles('./scrap/NewsMaintenance.json', listUpdate);
				}
				else{
					console.log('Pas de Nouvelle News Maintenance');
					WriteFiles('./scrap/NewsMaintenance.json', listUpdate);
				}
				
				return null;
		
			}	

   /****************************************************
    *********** NEWS CHANNEL UPDATES UPDATE ************
    ****************************************************/	

	async function updateNewsUpdates(){
		const puppeteer = require('puppeteer');
	
		(async () => {
			const browser = await puppeteer.launch({headless: true}); 
			const page = await browser.newPage();
			await page.goto('https://fr.finalfantasyxiv.com/lodestone/news/category/3');
	
			console.log('Update Updates')
	
			var ListNewsUpdates = await page.evaluate(()=>{
	
				var NewsUpdates = { "title":[], "src":[], "date": []}
				var elements = document.querySelectorAll('.news__content ul .news__list');
	
				for (let index = 4; index < 7; index++) {   
					
					NewsUpdates["title"].push(elements[index].querySelector('.news__list--title').textContent)
					NewsUpdates["src"].push(elements[index].querySelector('.news__list a').href )
					NewsUpdates["date"].push(elements[index].querySelector('.news__list--time span').textContent )
					
				}
				return NewsUpdates 
			});
			
			fs.writeFile('./scrap/NewsUpdatesUpdate.json', JSON.stringify(ListNewsUpdates, null, 4), (err)=>{
				if(err)
				console.log(err);
			})
			
			await browser.close();  
	
		})();
	
		return;
	
		}
		
	function EnvoieNotifNewsUpdates(){
			var listUpdate = JSON.parse(fs.readFileSync('./scrap/NewsUpdatesUpdate.json', 'utf-8'))
			var listJson = JSON.parse(fs.readFileSync('./scrap/NewsUpdates.json', 'utf-8'))
			console.log(listJson["title"][0]);
			console.log(listUpdate["title"][1]);
				//si 1 video a été ajouté
				if ( listJson["src"][0] === listUpdate["src"][1] && listJson["src"][1] === listUpdate["src"][2]) {
					console.log('Nouvelle News Updates');
					
					const frEmbed = new EmbedBuilder()
						.setColor('#4096ee')
						.setAuthor({ name: 'Mises à jour', iconURL: 'https://img.finalfantasyxiv.com/lds/h/0/U2uGfVX4GdZgU1jASO0m9h_xLg.png' })
						.setTitle(listUpdate["title"][0])
						.setURL(listUpdate["src"][0])
						.setFooter({ text: listUpdate["date"][0], iconURL: 'https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/calendar-color-icon.png' });
	
					client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })
		
					WriteFiles('./scrap/NewsUpdates.json', listUpdate);
				}
				//si 2 videos publiées
				else if ( listJson["src"][0] == listUpdate["src"][2]) {
					console.log('2 Nouvelle News Updates');
					
					const frEmbed = new EmbedBuilder()
						.setColor('#4096ee')
						.setAuthor({ name: 'Mises à jour', iconURL: 'https://img.finalfantasyxiv.com/lds/h/0/U2uGfVX4GdZgU1jASO0m9h_xLg.png' })
						.setTitle(listUpdate["title"][0])
						.setURL(listUpdate["src"][0])
						.setFooter({ text: listUpdate["date"][0], iconURL: 'https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/calendar-color-icon.png' });
	
					client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })
	
					WriteFiles('./scrap/NewsUpdates.json', listUpdate);
				}
				else{
					console.log('Pas de Nouvelle News Updates');
					WriteFiles('./scrap/NewsUpdates.json', listUpdate);
				}
				
				return null;
		
			}	

   /****************************************************
    ************ NEWS STATUS Status UPDATE ************
    ****************************************************/	

	async function updateNewsStatus(){
		const puppeteer = require('puppeteer');
	
		(async () => {
			const browser = await puppeteer.launch({headless: true}); 
			const page = await browser.newPage();
			await page.goto('https://fr.finalfantasyxiv.com/lodestone/news/category/4');
	
			console.log('Update Status')
	
			var ListNewsStatus = await page.evaluate(()=>{
	
				var NewsStatus = { "title":[], "src":[], "date": []}
				var elements = document.querySelectorAll('.news__content ul .news__list');
	
				for (let index = 4; index < 7; index++) {   
					
					NewsStatus["title"].push(elements[index].querySelector('.news__list--title').textContent)
					NewsStatus["src"].push(elements[index].querySelector('.news__list a').href )
					NewsStatus["date"].push(elements[index].querySelector('.news__list--time span').textContent )
					
				}
				return NewsStatus 
			});
			
			fs.writeFile('./scrap/NewsStatusUpdate.json', JSON.stringify(ListNewsStatus, null, 4), (err)=>{
				if(err)
				console.log(err);
			})
			
			await browser.close();  
	
		})();
	
		return;
	
		}
		
	function EnvoieNotifNewsStatus(){
			var listUpdate = JSON.parse(fs.readFileSync('./scrap/NewsStatusUpdate.json', 'utf-8'))
			var listJson = JSON.parse(fs.readFileSync('./scrap/NewsStatus.json', 'utf-8'))
			console.log(listJson["title"][0]);
			console.log(listUpdate["title"][1]);
				//si 1 video a été ajouté
				if ( listJson["src"][0] === listUpdate["src"][1] && listJson["src"][1] === listUpdate["src"][2]) {
					console.log('Nouvelle News Status');
					
					const frEmbed = new EmbedBuilder()
						.setColor('#4096ee')
						.setAuthor({ name: 'État', iconURL: 'https://img.finalfantasyxiv.com/lds/h/0/U2uGfVX4GdZgU1jASO0m9h_xLg.png' })
						.setTitle(listUpdate["title"][0])
						.setURL(listUpdate["src"][0])
						.setFooter({ text: listUpdate["date"][0], iconURL: 'https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/calendar-color-icon.png' });
	
					client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })
		
					WriteFiles('./scrap/NewsStatus.json', listUpdate);
				}
				//si 2 videos publiées
				else if ( listJson["src"][0] == listUpdate["src"][2]) {
					console.log('2 Nouvelle News Status');
					
					const frEmbed = new EmbedBuilder()
						.setColor('#4096ee')
						.setAuthor({ name: 'État', iconURL: 'https://img.finalfantasyxiv.com/lds/h/0/U2uGfVX4GdZgU1jASO0m9h_xLg.png' })
						.setTitle(listUpdate["title"][0])
						.setURL(listUpdate["src"][0])
						.setFooter({ text: listUpdate["date"][0], iconURL: 'https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/calendar-color-icon.png' });
	
					client.channels.cache.get(channelNews).send({ embeds: [frEmbed] })
	
					WriteFiles('./scrap/NewsStatus.json', listUpdate);
				}
				else{
					console.log('Pas de Nouvelle News Status');
					WriteFiles('./scrap/NewsStatus.json', listUpdate);
				}
				
				return null;
		
			}	

	/****************************************************
    ************** END OF NEWS ALL UPDATE ***************
    ****************************************************/	

//function WriteFile and Interval
		
setInterval(function(){
	updateNewsTopics()
	updateNewsNotices()
	updateNewsMaintenance()
	updateNewsUpdates()
	updateNewsStatus()

	console.log('set timer');

	setTimeout(function(){EnvoieNotifNewsTopic();}, 30000)
	setTimeout(function(){EnvoieNotifNewsNotice();}, 30000)
	setTimeout(function(){EnvoieNotifNewsMaintenance();}, 30000)
	setTimeout(function(){EnvoieNotifNewsUpdates();}, 30000)
	setTimeout(function(){EnvoieNotifNewsStatus();}, 30000)

}, 600000) //60000

function WriteFiles(file, data){

fs.writeFile(file, JSON.stringify(data, null, 4), (err)=>{
if(err)
console.log(err)
})

}
// Login to Discord with your client's token
client.login(token);