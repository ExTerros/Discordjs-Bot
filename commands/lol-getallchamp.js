process.env.LEAGUE_API_PLATFORM_ID = 'euw1'
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { developerriotgameskey } = require('../config.json');
const LeagueJS = require('LeagueJS');
const leagueJs = new LeagueJS(developerriotgameskey, {STATIC_DATA_ROOT: 'DataDragonHelper'});

module.exports = {
	data: new SlashCommandBuilder()
	.setName('rotachamp')
	.setDescription('Champion en rotation Lol'),
    async execute(interaction){
        leagueJs.Champion.gettingRotations()
        .then((result) => {
            // console.log(result)
            result['freeChampionIds'].forEach(element => {
                leagueJs.StaticData.gettingChampionById(element)
                .then((champName) => {
                    console.log(champName['name']);
                }).catch((err) => {
                    console.log(err);
                });
            });
            // for (let i = 0; i < result['freeChampionIds'].length; i++) {
            //     const element = result['freeChampionIds'][i];
            //     leagueJs.StaticData.gettingChampionById(element)
            //     .then((championName) => {
            //         championName['name']
            //     }).catch((err) => {
            //         console.log(err);
            //     });
            // }
            
        }).catch((err) => {
            console.log(err);
            
        });
        

    }
}