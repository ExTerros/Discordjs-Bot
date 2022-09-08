const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { default: axios } = require("axios");
const puppeteer = require('puppeteer');


module.exports = {
	data: new SlashCommandBuilder()
	.setName('lolchamp')
	.setDescription('Fiche du champion')
    .addStringOption(option =>
        option
            .setName('nom')
            .setDescription('Nom du champion')
            .setRequired(true)),
    async execute(interaction){
        //get user input
        const champion = interaction.options.getString('nom');
        const strChampion = champion.charAt(0).toUpperCase() + champion.slice(1);
        //get last version of league of legends
        const lolVersion = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
        const lolLastVersion = lolVersion.data[0];
        //get list of league of legends champion 
        const ddragonJson = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${lolLastVersion}/data/fr_FR/champion.json`);
        (async () => {
            const browser = await puppeteer.launch({headless: true}); 
            const page = await browser.newPage();
            await page.goto(`https://u.gg/lol/champions/${strChampion}/build?region=euw1`);
    
    
            
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

        if (ddragonJson.data['data'][strChampion]) {
        const listJson = ddragonJson.data['data'][strChampion]; 
        console.log(listJson);
        const ChampEmbed = new EmbedBuilder()
        .setColor('#FFC107')
        .setAuthor({ name: listJson['name'], iconURL: `https://www.mobafire.com/images/champion/square/${listJson['name']}.png` })
        .setTitle(`${listJson['name']}, ${listJson['title']}`)
        .setURL(`https://u.gg/lol/champions/${listJson['name']}/build`)
        .setDescription(listJson['blurb'])
        .addFields(
            { name: 'HP', value: `${listJson['stats']['hp']}`, inline: true },
            { name: 'HP par level', value: `${listJson['stats']['hpperlevel']}`, inline: true },
            { name: '‎', value: '‎ ', inline: true },
            { name: 'Mana', value: `${listJson['stats']['mp']}`, inline: true },
            { name: 'Mana par level', value: `${listJson['stats']['mpperlevel']}`, inline: true },
            { name: '‎', value: '‎ ', inline: true },
            { name: 'Régenération hp', value: `${listJson['stats']['hpregen']}`, inline: true },
            { name: 'Régenération hp par level', value: `${listJson['stats']['hpregenperlevel']}`, inline: true },
            { name: '‎', value: '‎ ', inline: true },
            { name: 'Régenération Mana', value: `${listJson['stats']['mpregen']}`, inline: true },
            { name: 'Régenération Mana par level', value: `${listJson['stats']['mpregenperlevel']}`, inline: true },
            { name: '‎', value: '‎ ', inline: true },
            { name: 'Attack damage', value: `${listJson['stats']['attackdamage']}`, inline: true },
            { name: 'Régenération Attack damage par level', value: `${listJson['stats']['attackdamageperlevel']}`, inline: true },
            { name: '‎', value: '‎ ', inline: true },
            { name: 'Attack speed', value: `${listJson['stats']['attackspeed']}`, inline: true },
            { name: 'Attack speed par level', value: `${listJson['stats']['attackspeedperlevel']}`, inline: true },
            { name: '‎', value: '‎ ', inline: true },
            { name: 'Crit', value: `${listJson['stats']['crit']}`, inline: true },
            { name: 'Crit par level', value: `${listJson['stats']['critperlevel']}`, inline: true },
            { name: '‎', value: '‎ ', inline: true },
            { name: '‎', value: '‎ ', inline: true },
            { name: 'Tier', value: `${tier}`, inline: true },
            { name: 'Win Rate', value: `${Win}`, inline: true },
            { name: 'Rank', value: `${Rank}`, inline: true },
            { name: 'Pick Rate', value: `${Pick}`, inline: true },
            { name: 'Ban Rate', value: `${Ban}`, inline: true },
            { name: 'Matches', value: `${Matches}`, inline: true },
        )
        .setImage(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${listJson['name']}_0.jpg`)
        let tags = []
        for (let i = 0; i < listJson['tags'].length; i++) {
            
            tags.push(listJson['tags'][i])
            
        }
        const ChampEmbedTag = EmbedBuilder.from(ChampEmbed)
            .addFields(
                { name: 'Type', value: `${tags}`, inline: true })
            interaction.reply({ embeds: [ChampEmbedTag] });
        }else{
            interaction.reply("Aucun champion ne porte ce nom")
        }

        
    })();

        
    }
}