// setting default platformId to be used if you don't specify it on the endpoint method
process.env.LEAGUE_API_PLATFORM_ID = 'euw1'
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { developerriotgameskey } = require('../config.json');
const LeagueJS = require('LeagueJS');
const leagueJs = new LeagueJS(developerriotgameskey, {STATIC_DATA_ROOT: 'DataDragonHelper'});

module.exports = {
	data: new SlashCommandBuilder()
	.setName('lolmatch')
	.setDescription('Voir les infos de votre partie lol')
    .addStringOption(option =>
        option
            .setName('pseudo')
            .setDescription('Votre nom en jeu')
            .setRequired(true)),
    async execute(interaction,){
        const accountName = interaction.options.getString('pseudo')
        leagueJs.Summoner
        .gettingByName(accountName)
        .then(data => {
            'use strict';
            // console.log(data);              
            leagueJs.Spectator
            .gettingActiveGame(data['id'])
            .then((result) => {
            // console.log(result['participants']); 
            let text = [];
            for (let i = 0; i < result['participants'].length; i++) {
                const element = result['participants'][i];
                leagueJs.StaticData.gettingChampionById(element['championId'])
                .then((champ) => {
                    text.push(`${element['summonerName']} joue ${champ['name']} dans la team ${element['teamId']}`)

                }).catch((err) => {
                    console.log(err);
                });
            }
            return text
            }).catch((err) => {
            console.log(err);
                
            });
        })
        .catch(err => {
            'use strict';
            console.log(err);
        });

    }
}