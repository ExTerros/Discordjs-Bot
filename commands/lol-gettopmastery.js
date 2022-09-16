// setting default platformId to be used if you don't specify it on the endpoint method
process.env.LEAGUE_API_PLATFORM_ID = 'euw1'
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { developerriotgameskey } = require('../config.json');
const LeagueJS = require('../node_modules/leaguejs/lib/LeagueJS');
const leagueJs = new LeagueJS(developerriotgameskey, {STATIC_DATA_ROOT: 'DataDragonHelper'});

module.exports = {
	data: new SlashCommandBuilder()
	.setName('lolprofil')
	.setDescription('Affiche votre Profil league of legends')
    .addStringOption(option =>
        option
            .setName('pseudo')
            .setDescription('Votre nom en jeu')
            .setRequired(true)),
    async execute(interaction,){
        await interaction.reply("Je consulte l'api de lol");
        let accountName = interaction.options.getString('pseudo')
        leagueJs.Summoner.gettingByName(accountName)
        .then((account) => {
            let PseudoAccount = account['name'];
            let LevelAccount = account['summonerLevel']
            let IconAccount = account['profileIconId']
            let AccountLol = new EmbedBuilder()
            .setColor('#92c0d3')
            .setTitle(`Profil de ${PseudoAccount} Level ${LevelAccount}`)
            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/12.17.1/img/profileicon/${IconAccount}.png`)
            .setTimestamp()
            leagueJs.ChampionMastery.gettingBySummoner(account['id'])
            .then((mastery) => {
                leagueJs.StaticData.gettingChampionById(mastery[0]['championId'])
                .then((bestFirstChamp) => {
                    let firstChampionName = bestFirstChamp['name'];
                    let firstChampionMastery = `M${mastery[0]['championLevel']} ${mastery[0]['championPoints']}`;

                        leagueJs.StaticData.gettingChampionById(mastery[1]['championId'])
                        .then((bestSecondeChamp) => {
                        let secondeChampionName = bestSecondeChamp['name'];
                        let secondeChampionMastery = `M${mastery[1]['championLevel']} ${mastery[1]['championPoints']}`;
                            
                            leagueJs.StaticData.gettingChampionById(mastery[2]['championId'])
                            .then((bestTroisChamp) => {
                                let threeChampionName = bestTroisChamp['name'];
                                let threeChampionMastery = `M${mastery[2]['championLevel']} ${mastery[2]['championPoints']}`;
                            
                                leagueJs.StaticData.gettingChampionById(mastery[3]['championId'])
                                .then((bestQuatreChamp) => {
                                let quatreChampionName = bestQuatreChamp['name'];
                                let quatreChampionMastery = `M${mastery[3]['championLevel']} ${mastery[3]['championPoints']}`;

                                    leagueJs.StaticData.gettingChampionById(mastery[4]['championId'])
                                    .then((bestCinqChamp) => {
                                        let cinqChampionName = bestCinqChamp['name'];
                                        let cinqChampionMastery = `M${mastery[4]['championLevel']} ${mastery[4]['championPoints']}`;
                                        AccountLol.addFields(
                                            { name: 'Top Champion', value: `**${firstChampionName}**\n└${firstChampionMastery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                            **${secondeChampionName}**\n└${secondeChampionMastery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                            **${threeChampionName}**\n└${threeChampionMastery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                            **${quatreChampionName}**\n└${quatreChampionMastery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                            **${cinqChampionName}**\n└${cinqChampionMastery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, inline: true }
                                        )
                                            leagueJs.League.gettingEntriesForSummonerId(account['id'])
                                            .then((ranked) => {
                                                console.log(ranked.length);
                                                if (ranked.length == 2) {
                                                    AccountLol.addFields(
                                                        { name: `${ranked[0]['queueType'].replace('_',' ').replace('_SR','')}`, value: `${ranked[0]['tier']} ${ranked[0]['rank']} ${ranked[0]['leaguePoints']} LP \n ${ranked[0]['wins']}W ${ranked[0]['losses']}L`, inline: true },
                                                        { name: `${ranked[1]['queueType'].replace('_',' ').replace('_','')}`, value: `${ranked[1]['tier']} ${ranked[1]['rank']} ${ranked[1]['leaguePoints']} LP \n ${ranked[1]['wins']}W ${ranked[1]['losses']}L`, inline: true }
                                                        )

                                                }else{
                                                    console.log('Pas de Ranked');
                                                }
                                                interaction.editReply({ embeds: [AccountLol] });
                                            })

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