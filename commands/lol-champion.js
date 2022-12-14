const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
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
        const str = interaction.options.getString('nom').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const champion = str.split(" ");
        for (var i = 0; i < champion.length; i++) {
          champion[i] = champion[i].charAt(0).toUpperCase() + champion[i].slice(1);
        }
        const strChampion = champion.join(" ").replace(' ','');
        //get last version of league of legends
        const lolVersion = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
        const lolLastVersion = lolVersion.data[0];
        //get list of league of legends champion 
        const ddragonJson = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${lolLastVersion}/data/fr_FR/champion.json`);
        await interaction.reply('Je recherche le champion');

        if (ddragonJson.data['data'][strChampion]) {
        (async () => {
            const browser = await puppeteer.launch({headless: true,	args: ['--no-sandbox']});
            const page = await browser.newPage();
            await page.goto(`https://u.gg/lol/champions/${strChampion}/build`);
            await page.click('button[mode=primary]');
          await page.setViewport({
              width: 1920,
              height: 1080,
            });
          await page.waitForSelector('#close-div-gpt-ad-sticky-bottom')
          
          await page.evaluate(async() => {
            await new Promise(function(resolve) { 
                   setTimeout(resolve, 2000)
            });
        });
        const rune = await page.waitForSelector("#content > div > div.champion-profile-content-container.content-side-padding > div > div > div.champion-profile-page > div > div.rune-spell > div > div.content-section_content.recommended-build_runes");
            await rune.screenshot({path: "./assets/runes.png"});      
    
            const tier = await page.evaluate(() => {
                const tier = document.querySelector(".champion-tier .tier");
                const tierText = tier.innerText;
            
                return tierText;
              });
              const ChampionName = await page.evaluate(() => {
                const ChampionName = document.querySelector(".champion-label .champion-name");
                const ChampionNameText = ChampionName.innerText;
            
                return ChampionNameText;
              });
              const ChampionImage = await page.evaluate(() => {
                const ChampionImage = document.querySelector(".champion-image-border .champion-image");
                const ChampionImageText = ChampionImage.src;
            
                return ChampionImageText;
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

            const select = await page.waitForSelector("div.champion-recommended-build div.media-query_DESKTOP_MEDIUM__DESKTOP_LARGE");
            await select.screenshot({path: "./assets/build.png"});
            
        
          await browser.close();  

        const file = new AttachmentBuilder("./assets/build.png");
        const runes = new AttachmentBuilder("./assets/runes.png");
        const listJson = ddragonJson.data['data'][strChampion]; 
        const ChampEmbed = new EmbedBuilder()
        .setColor('#FFC107')
        .setAuthor({ name: listJson['name'], iconURL: `${ChampionImage}` })
        .setTitle(`${listJson['name']}, ${listJson['title']}`)
        .setURL(page.url())
        .setThumbnail('attachment://runes.png')
        .setDescription(listJson['blurb'])
        .addFields(
            { name: 'Tier', value: `${tier}`, inline: true },
            { name: 'Win Rate', value: `${Win}`, inline: true },
            { name: 'Rank', value: `${Rank}`, inline: true },
            { name: 'Pick Rate', value: `${Pick}`, inline: true },
            { name: 'Ban Rate', value: `${Ban}`, inline: true },
            { name: 'Matches', value: `${Matches}`, inline: true },
        )
        .setImage('attachment://build.png');
        let tags = []
        for (let i = 0; i < listJson['tags'].length; i++) {
            
            tags.push(listJson['tags'][i])
            
        }
        const ChampEmbedTag = EmbedBuilder.from(ChampEmbed)
            .addFields(
                { name: 'Type', value: `${tags}`, inline: true })
            interaction.editReply({ embeds: [ChampEmbedTag], files: [file, runes] });
      })();

        }else{
            interaction.editReply("Aucun champion ne porte ce nom")
        }

        

        
    }
}