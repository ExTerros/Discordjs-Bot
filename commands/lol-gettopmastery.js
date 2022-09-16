// setting default platformId to be used if you don't specify it on the endpoint method
process.env.LEAGUE_API_PLATFORM_ID = 'euw1'
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { developerriotgameskey } = require('../config.json');
const LeagueJS = require('LeagueJS');
const leagueJs = new LeagueJS(developerriotgameskey, {STATIC_DATA_ROOT: 'DataDragonHelper'});

module.exports = {
	data: new SlashCommandBuilder()
	.setName('lolprofil')
	.setDescription('...')
    .addStringOption(option =>
        option
            .setName('pseudo')
            .setDescription('Votre nom en jeu')
            .setRequired(true)),
    async execute(interaction,){
        const accountName = interaction.options.getString('pseudo')
        leagueJs.Summoner.gettingByName(accountName)
        .then((account) => {
            const PseudoAccount = account['name'];
            const LevelAccount = account['summonerLevel']
            const IconAccount = account['profileIconId']
            const AccountLol = new EmbedBuilder()
            .setColor('#92c0d3')
            .setTitle(`Profil de ${PseudoAccount}`)
            .addFields(
                { name: 'Level', value: `${LevelAccount}`, inline: true  }
            )
            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/12.17.1/img/profileicon/${IconAccount}.png`)
            .setTimestamp()
            leagueJs.ChampionMastery.gettingBySummoner(account['id'])
            .then((mastery) => {
                leagueJs.StaticData.gettingChampionById(mastery[0]['championId'])
                .then((bestFirstChamp) => {
                    const firstChampionName = bestFirstChamp['name'];
                    const firstChampionMastery = `M${mastery[0]['championLevel']} ${mastery[0]['championPoints']}`;

                        leagueJs.StaticData.gettingChampionById(mastery[1]['championId'])
                        .then((bestSecondeChamp) => {
                        const secondeChampionName = bestSecondeChamp['name'];
                        const secondeChampionMastery = `M${mastery[1]['championLevel']} ${mastery[1]['championPoints']}`;
                            
                            leagueJs.StaticData.gettingChampionById(mastery[2]['championId'])
                            .then((bestTroisChamp) => {
                                const threeChampionName = bestTroisChamp['name'];
                                const threeChampionMastery = `M${mastery[2]['championLevel']} ${mastery[2]['championPoints']}`;
                            
                                leagueJs.StaticData.gettingChampionById(mastery[3]['championId'])
                                .then((bestQuatreChamp) => {
                                const quatreChampionName = bestQuatreChamp['name'];
                                const quatreChampionMastery = `M${mastery[3]['championLevel']} ${mastery[3]['championPoints']}`;

                                    leagueJs.StaticData.gettingChampionById(mastery[4]['championId'])
                                    .then((bestCinqChamp) => {
                                        const cinqChampionName = bestCinqChamp['name'];
                                        const cinqChampionMastery = `M${mastery[4]['championLevel']} ${mastery[4]['championPoints']}`;
                                        AccountLol.addFields(
                                            { name: 'Top Champion', value: `${firstChampionName}\n└${firstChampionMastery}
                                                                            ${secondeChampionName}\n└${secondeChampionMastery}
                                                                            ${threeChampionName}\n└${threeChampionMastery}
                                                                            ${quatreChampionName}\n└${quatreChampionMastery}
                                                                            ${cinqChampionName}\n└${cinqChampionMastery}`, inline: true }
                                        )
                                        interaction.reply({ embeds: [AccountLol] });

                                    })
                                })
                })
                })
                }).catch((err) => {
                    
                });

            }).catch((err) => {
                
            });
        }).catch((err) => {
            
        });
    }
}