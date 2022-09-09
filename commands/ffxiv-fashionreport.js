const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { default: axios } = require("axios")

var lastPosted = 1661518581; // default date
var imageLink = "https://external-preview.redd.it/SSULPXR8roI4I-e5youiOa2YcAQctQKB9i1xeONMfqg.png?auto=webp&s=7ef5e18111c615732f1c98429511530fec751a52";
var lastWeek = "239"; // default week
var title = 'Fashion Report - Full Details - For Week of 8/26/2022 (Week 239)'
var linkreddit = "https://www.reddit.com/r/ffxiv/comments/wy8i8d/fashion_report_full_details_for_week_of_8262022/"

module.exports = {
	data: new SlashCommandBuilder()
	.setName('ffxivfashion')
	.setDescription('Affiche le Fashion Report de la semaine'),
    async execute(interaction){
        await interaction.reply("J'appelle Miss Kaiyoko Star");

        const frEmbed = new EmbedBuilder()
            .setColor('#FFC107')
            .setTitle(title)
            .setURL(linkreddit)
            .setAuthor({ name: "Miss Kaiyoko Star", iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/7f866006-7a36-4b8c-a99a-d1131c2e0628-profile_image-70x70.png' })
            .setImage(imageLink);
            
        const today = new Date();
        if ((today - lastPosted * 1000) / 1000 / 60 / 60 / 24 < 6){ // if the post was from within 6 days ago, then don't bother updating 
            console.log("used old fr value");
            await interaction.editReply({ embeds: [frEmbed] });
        }
        console.log("Upadating Fashion")
        //get api status
        const apiStatus = (await axios.get('https://www.reddit.com/user/kaiyoko/submitted.json')).status

        if (apiStatus === 200){
            //get api data
            const apidata = await axios.get('https://www.reddit.com/user/kaiyoko/submitted.json')
            for (let i = 0; i < 25; i++){
                var current = apidata.data['data']['children'][i]['data'];

                if (current['title'].indexOf("Fashion Report - Full Details - For Week") !== -1){
                    if (current['created_utc'] === lastPosted){
                        console.log("couldn't find newer post to update to");
                        return interaction.editReply({ embeds: [frEmbed] });
                    }

                    const currentImage = current['preview']['images'][0]['source']['url'];
                    const strCurrentImage = currentImage.replace('amp;s', 's')
                    const PermaLink = 'https://www.reddit.com' + current['permalink'];
                    
                    imageLink = strCurrentImage;
                    console.log(imageLink)
                    lastPosted = current['created_utc'];
                    lastWeek = current['title'].substring(current['title'].indexOf("(Week") + 6, current['title'].indexOf("(Week") + 9);
                    console.log("successfully updated (found new post!)");
                    
                    //embed create
                    frEmbed.setColor('#FFC107')
                    frEmbed.setAuthor({ name: "Miss Kaiyoko Star", iconURL: 'https://static-cdn.jtvnw.net/jtv_user_pictures/7f866006-7a36-4b8c-a99a-d1131c2e0628-profile_image-70x70.png' })
                    frEmbed.setTitle(current['title']);
                    frEmbed.setURL(PermaLink)
                    frEmbed.setImage(imageLink);
                    frEmbed.setTimestamp()
                    return interaction.editReply({ embeds: [frEmbed] });
                }
            }
        }else if(apiStatus == 404){
            console.log(apiStatus);
        }else{
            console.log('lol');
        }
    }
}