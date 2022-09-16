// setting default platformId to be used if you don't specify it on the endpoint method
process.env.LEAGUE_API_PLATFORM_ID = 'euw1';
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { developerriotgameskey } = require('../config.json');
const LeagueJS = require('../node_modules/leaguejs/lib/LeagueJS');
const leagueJs = new LeagueJS(developerriotgameskey, {STATIC_DATA_ROOT: 'DataDragonHelper'});

module.exports = {
	data: new SlashCommandBuilder()
	.setName('lolmatch')
	.setDescription('Affiche votre game league of legends')
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
            leagueJs.Spectator.gettingActiveGame(account['id'])
            .then((currentGame) => {
                let PseudoAccount = account['name'];
                let LevelAccount = account['summonerLevel']
                console.log(currentGame);
                let ActualGameLol = new EmbedBuilder()
                .setColor('#92c0d3')
                .setTitle(`Partie en cours de ${PseudoAccount} Level ${LevelAccount}`)
                .setTimestamp()
                if (currentGame['bannedChampions'][0]) {    
                leagueJs.StaticData.gettingChampionById(currentGame['bannedChampions'][0]['championId'])
                .then((champtionBanned0) => {
                    console.log(champtionBanned0['name']);
                    console.log('Team Bleu');
                    leagueJs.StaticData.gettingChampionById(currentGame['bannedChampions'][1]['championId'])
                    .then((champtionBanned1) => {
                    console.log(champtionBanned1['name']);
                    console.log('Team Bleu');
                        leagueJs.StaticData.gettingChampionById(currentGame['bannedChampions'][2]['championId'])
                        .then((champtionBanned2) => {
                        console.log(champtionBanned2['name']);
                        console.log('Team Bleu');
                            leagueJs.StaticData.gettingChampionById(currentGame['bannedChampions'][3]['championId'])
                            .then((champtionBanned3) => {
                            console.log(champtionBanned3['name']);
                            console.log('Team Bleu');
                                leagueJs.StaticData.gettingChampionById(currentGame['bannedChampions'][4]['championId'])
                                .then((champtionBanned4) => {
                                console.log(champtionBanned4['name']);
                                console.log('Team Bleu');
                                    leagueJs.StaticData.gettingChampionById(currentGame['bannedChampions'][5]['championId'])
                                    .then((champtionBanned5) => {
                                    console.log(champtionBanned5['name']);
                                    console.log('Team Rouge');
                                        leagueJs.StaticData.gettingChampionById(currentGame['bannedChampions'][6]['championId'])
                                        .then((champtionBanned6) => {
                                        console.log(champtionBanned6['name']);
                                        console.log('Team Rouge');
                                            leagueJs.StaticData.gettingChampionById(currentGame['bannedChampions'][7]['championId'])
                                            .then((champtionBanned7) => {
                                            console.log(champtionBanned7['name']);
                                            console.log('Team Rouge');
                                                leagueJs.StaticData.gettingChampionById(currentGame['bannedChampions'][8]['championId'])
                                                .then((champtionBanned8) => {
                                                console.log(champtionBanned8['name']);
                                                console.log('Team Rouge');
                                                    leagueJs.StaticData.gettingChampionById(currentGame['bannedChampions'][9]['championId'])
                                                    .then((champtionBanned9) => {
                                                    console.log(champtionBanned9['name']);
                                                    console.log('Team Rouge');
                                                    ActualGameLol.addFields(
                                                        { name: 'Ban Team Bleu', value: `${champtionBanned0['name']}\n${champtionBanned1['name']}
                                                                                         ${champtionBanned2['name']}\n${champtionBanned3['name']}
                                                                                         ${champtionBanned4['name']}`, inline: true},
                                                        { name: '\u200B', value: '\u200B', inline: true },
                                                        { name: 'Ban Team Rouge', value: `${champtionBanned5['name']}\n${champtionBanned6['name']}
                                                                                         ${champtionBanned7['name']}\n${champtionBanned8['name']}
                                                                                         ${champtionBanned9['name']}`, inline: true},
                                                        
                                                    )
                                                    leagueJs.StaticData.gettingChampionById(currentGame['participants'][0]['championId'])
                                                    .then((playerChampNumber1) => {
                                                        leagueJs.League.gettingEntriesForSummonerId(currentGame['participants'][0]['summonerId'])
                                                        .then((playerRank1) => {
                                                            
                                                            console.log(`${currentGame['participants'][0]['summonerName']} joue ${playerChampNumber1['name']}`);
                                                            if (playerRank1[0]) {
                                                                if (playerRank1[0]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                    const winrate = Math.round(playerRank1[0]['wins'] / (playerRank1[0]['wins'] + playerRank1[0]['losses'])*100);
                                                                    ActualGameLol.addFields(
                                                                        { name: `${currentGame['participants'][0]['summonerName']} | ${playerChampNumber1['name']}`, value: `${playerRank1[0]['queueType'].replace('_',' ').replace('_SR','').replace('_5x5',' DUO')}\n${playerRank1[0]['tier']} ${playerRank1[0]['rank']} ${playerRank1[0]['leaguePoints']} LP \n ${playerRank1[0]['wins']}W ${playerRank1[0]['losses']}L ${winrate}%`, inline: true },
                                                                        { name: '\u200B', value: '\u200B', inline: true },
                                                                        )
                                                                }else{
                                                                    console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                }
                                                            }
                                                            if (playerRank1[1]) {
                                                            if (playerRank1[1]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                const winrate = Math.round(playerRank1[1]['wins'] / (playerRank1[1]['wins'] + playerRank1[1]['losses'])*100);
                                                                ActualGameLol.addFields(
                                                                    { name: `${currentGame['participants'][0]['summonerName']} | ${playerChampNumber1['name']}`, value: `${playerRank1[1]['queueType'].replace('_',' ').replace('_5x5',' DUO').replace('_SR','')}\n${playerRank1[1]['tier']} ${playerRank1[1]['rank']} ${playerRank1[1]['leaguePoints']} LP \n ${playerRank1[1]['wins']}W ${playerRank1[1]['losses']}L ${winrate}%`, inline: true },
                                                                    { name: '\u200B', value: '\u200B', inline: true },
                                                                    )
                                                            }else{
                                                                console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                            }
                                                        }
                                                        if (!playerRank1[0]) {
                                                                ActualGameLol.addFields(
                                                                    { name: `${currentGame['participants'][0]['summonerName']}`, value: `${playerChampNumber1['name']}`, inline: true },
                                                                    { name: '\u200B', value: '\u200B', inline: true },
                                                                    )
                                                        }
                                                                leagueJs.StaticData.gettingChampionById(currentGame['participants'][5]['championId'])
                                                                .then((playerChampNumber2) => {
                                                                    leagueJs.League.gettingEntriesForSummonerId(currentGame['participants'][5]['summonerId'])
                                                                    .then((playerRank2) => {
                                                                        console.log(playerRank2);
                                                                        console.log(`${currentGame['participants'][5]['summonerName']} | ${playerChampNumber2['name']}`);
                                                                        if (playerRank2[0]) {
                                                                        if (playerRank2[0]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                            const winrate = Math.round(playerRank2[0]['wins'] / (playerRank2[0]['wins'] + playerRank2[0]['losses'])*100);
                                                                            ActualGameLol.addFields(
                                                                                { name: `${currentGame['participants'][5]['summonerName']} | ${playerChampNumber2['name']}`, value: `${playerRank2[0]['queueType'].replace('_',' ').replace('_SR','').replace('_5x5',' DUO')}\n${playerRank2[0]['tier']} ${playerRank2[0]['rank']} ${playerRank2[0]['leaguePoints']} LP \n ${playerRank2[0]['wins']}W ${playerRank2[0]['losses']}L ${winrate}%`, inline: true },
                                                                                )
                                                                        }else{
                                                                            console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                        }
                                                                    }
                                                                    if (playerRank2[1]) {
                                                                        if (playerRank2[1]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                            const winrate = Math.round(playerRank2[1]['wins'] / (playerRank2[1]['wins'] + playerRank2[1]['losses'])*100);
                                                                            ActualGameLol.addFields(
                                                                                { name: `${currentGame['participants'][5]['summonerName']} | ${playerChampNumber2['name']}`, value: `${playerRank2[1]['queueType'].replace('_',' ').replace('_5x5',' DUO').replace('_SR','')}\n${playerRank2[1]['tier']} ${playerRank2[1]['rank']} ${playerRank2[1]['leaguePoints']} LP \n ${playerRank2[1]['wins']}W ${playerRank2[1]['losses']}L ${winrate}%`, inline: true },
                                                                                )
                                                                        }else{
                                                                            console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                        }
                                                                    }
                                                                    if (!playerRank2[0]) {
                                                                        ActualGameLol.addFields(
                                                                            { name: `${currentGame['participants'][5]['summonerName']}`, value: `${playerChampNumber2['name']}`, inline: true },
                                                                            )
                                                                }
                                                                            leagueJs.StaticData.gettingChampionById(currentGame['participants'][1]['championId'])
                                                                            .then((playerChampNumber3) => {
                                                                                leagueJs.League.gettingEntriesForSummonerId(currentGame['participants'][1]['summonerId'])
                                                                                .then((playerRank3) => {
                                                                                    console.log(`${currentGame['participants'][1]['summonerName']} | ${playerChampNumber3['name']}`);
                                                                                    if (playerRank3[0]) {
                                                                                    if (playerRank3[0]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                        const winrate = Math.round(playerRank3[0]['wins'] / (playerRank3[0]['wins'] + playerRank3[0]['losses'])*100);
                                                                                        ActualGameLol.addFields(
                                                                                            { name: `${currentGame['participants'][1]['summonerName']} | ${playerChampNumber3['name']}`, value: `${playerRank3[0]['queueType'].replace('_',' ').replace('_SR','').replace('_5x5',' DUO')}\n${playerRank3[0]['tier']} ${playerRank3[0]['rank']} ${playerRank3[0]['leaguePoints']} LP \n ${playerRank3[0]['wins']}W ${playerRank3[0]['losses']}L ${winrate}%`, inline: true },
                                                                                            { name: '\u200B', value: '\u200B', inline: true },
                                                                                            )
                                                                                    }else{
                                                                                        console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                    }}
                                                                                    if (playerRank3[1]) {
                                                                                    if (playerRank3[1]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                        const winrate = Math.round(playerRank3[1]['wins'] / (playerRank3[1]['wins'] + playerRank3[1]['losses'])*100);
                                                                                        ActualGameLol.addFields(
                                                                                            { name: `${currentGame['participants'][1]['summonerName']} | ${playerChampNumber3['name']}`, value: `${playerRank3[1]['queueType'].replace('_',' ').replace('_5x5',' DUO').replace('_SR','')}\n${playerRank3[1]['tier']} ${playerRank3[1]['rank']} ${playerRank3[1]['leaguePoints']} LP \n ${playerRank3[1]['wins']}W ${playerRank3[1]['losses']}L ${winrate}%`, inline: true },
                                                                                            { name: '\u200B', value: '\u200B', inline: true },
                                                                                            )
                                                                                    }else{
                                                                                        console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                    }}
                                                                                    if (!playerRank3[0]) {
                                                                                        ActualGameLol.addFields(
                                                                                            { name: `${currentGame['participants'][1]['summonerName']}`, value: `${playerChampNumber3['name']}`, inline: true },
                                                                                            { name: '\u200B', value: '\u200B', inline: true },
                                                                                            )
                                                                                }
                                                                                        leagueJs.StaticData.gettingChampionById(currentGame['participants'][6]['championId'])
                                                                                        .then((playerChampNumber4) => {
                                                                                            leagueJs.League.gettingEntriesForSummonerId(currentGame['participants'][6]['summonerId'])
                                                                                            .then((playerRank4) => {
                                                                                                console.log(`${currentGame['participants'][6]['summonerName']} | ${playerChampNumber4['name']}`);
                                                                                                if (playerRank4[0]) {
                                                                                                if (playerRank4[0]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                    const winrate = Math.round(playerRank4[0]['wins'] / (playerRank4[0]['wins'] + playerRank4[0]['losses'])*100);
                                                                                                    ActualGameLol.addFields(
                                                                                                        { name: `${currentGame['participants'][6]['summonerName']} | ${playerChampNumber4['name']}`, value: `${playerRank4[0]['queueType'].replace('_',' ').replace('_SR','').replace('_5x5',' DUO')}\n${playerRank4[0]['tier']} ${playerRank4[0]['rank']} ${playerRank4[0]['leaguePoints']} LP \n ${playerRank4[0]['wins']}W ${playerRank4[0]['losses']}L ${winrate}%`, inline: true },
                                                                                                        )
                                                                                                }else{
                                                                                                    console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                }}
                                                                                                if (playerRank4[1]) {
                                                                                                if (playerRank4[1]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                    const winrate = Math.round(playerRank4[1]['wins'] / (playerRank4[1]['wins'] + playerRank4[1]['losses'])*100);
                                                                                                    ActualGameLol.addFields(
                                                                                                        { name: `${currentGame['participants'][6]['summonerName']} | ${playerChampNumber4['name']}`, value: `${playerRank4[1]['queueType'].replace('_',' ').replace('_5x5',' DUO').replace('_SR','')}\n${playerRank4[1]['tier']} ${playerRank4[1]['rank']} ${playerRank4[1]['leaguePoints']} LP \n ${playerRank4[1]['wins']}W ${playerRank4[1]['losses']}L ${winrate}%`, inline: true },
                                                                                                        )
                                                                                                }else{
                                                                                                    console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                }}
                                                                                                if (!playerRank4[0]) {
                                                                                                    ActualGameLol.addFields(
                                                                                                        { name: `${currentGame['participants'][6]['summonerName']}`, value: `${playerChampNumber4['name']}`, inline: true },
                                                                                                        )
                                                                                            }
                                                                                                    leagueJs.StaticData.gettingChampionById(currentGame['participants'][2]['championId'])
                                                                                                    .then((playerChampNumber5) => {
                                                                                                        leagueJs.League.gettingEntriesForSummonerId(currentGame['participants'][2]['summonerId'])
                                                                                                        .then((playerRank5) => {
                                                                                                            console.log(`${currentGame['participants'][2]['summonerName']} | ${playerChampNumber5['name']}`);
                                                                                                            if (playerRank5[0]) {
                                                                                                            if (playerRank5[0]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                const winrate = Math.round(playerRank5[0]['wins'] / (playerRank5[0]['wins'] + playerRank5[0]['losses'])*100);
                                                                                                                ActualGameLol.addFields(
                                                                                                                    { name: `${currentGame['participants'][2]['summonerName']} | ${playerChampNumber5['name']}`, value: `${playerRank5[0]['queueType'].replace('_',' ').replace('_SR','').replace('_5x5',' DUO')}\n${playerRank5[0]['tier']} ${playerRank5[0]['rank']} ${playerRank5[0]['leaguePoints']} LP \n ${playerRank5[0]['wins']}W ${playerRank5[0]['losses']}L ${winrate}%`, inline: true },
                                                                                                                    { name: '**Vs**', value: '**Contre**', inline: true },
                                                                                                                    )
                                                                                                            }else{
                                                                                                                console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                            }}
                                                                                                            if (playerRank5[1]) {
                                                                                                            if (playerRank5[1]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                const winrate = Math.round(playerRank5[1]['wins'] / (playerRank5[1]['wins'] + playerRank5[1]['losses'])*100);
                                                                                                                ActualGameLol.addFields(
                                                                                                                    { name: `${currentGame['participants'][2]['summonerName']} | ${playerChampNumber5['name']}`, value: `${playerRank5[1]['queueType'].replace('_',' ').replace('_5x5',' DUO').replace('_SR','')}\n${playerRank5[1]['tier']} ${playerRank5[1]['rank']} ${playerRank5[1]['leaguePoints']} LP \n ${playerRank5[1]['wins']}W ${playerRank5[1]['losses']}L ${winrate}%`, inline: true },
                                                                                                                    { name: '**Vs**', value: '**Contre**', inline: true },
                                                                                                                    )
                                                                                                            }else{
                                                                                                                console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                            }}
                                                                                                            if (!playerRank5[0]) {
                                                                                                                ActualGameLol.addFields(
                                                                                                                    { name: `${currentGame['participants'][2]['summonerName']}`, value: `${playerChampNumber5['name']}`, inline: true },
                                                                                                                    { name: '**Vs**', value: '**Contre**', inline: true },
                                                                                                                    )
                                                                                                        }
                                                                                                                leagueJs.StaticData.gettingChampionById(currentGame['participants'][7]['championId'])
                                                                                                                .then((playerChampNumber6) => {
                                                                                                                    leagueJs.League.gettingEntriesForSummonerId(currentGame['participants'][7]['summonerId'])
                                                                                                                    .then((playerRank6) => {
                                                                                                                        console.log(`${currentGame['participants'][7]['summonerName']} | ${playerChampNumber6['name']}`);
                                                                                                                        if (playerRank6[0]) {
                                                                                                                        if (playerRank6[0]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                            const winrate = Math.round(playerRank6[0]['wins'] / (playerRank6[0]['wins'] + playerRank6[0]['losses'])*100);
                                                                                                                            ActualGameLol.addFields(
                                                                                                                                { name: `${currentGame['participants'][7]['summonerName']} | ${playerChampNumber6['name']}`, value: `${playerRank6[0]['queueType'].replace('_',' ').replace('_SR','').replace('_5x5',' DUO')}\n${playerRank6[0]['tier']} ${playerRank6[0]['rank']} ${playerRank6[0]['leaguePoints']} LP \n ${playerRank6[0]['wins']}W ${playerRank6[0]['losses']}L ${winrate}%`, inline: true },
                                                                                                                                )
                                                                                                                        }else{
                                                                                                                            console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                                        }}
                                                                                                                        if (playerRank6[1]) {
                                                                                                                        if (playerRank6[1]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                            const winrate = Math.round(playerRank6[1]['wins'] / (playerRank6[1]['wins'] + playerRank6[1]['losses'])*100);
                                                                                                                            ActualGameLol.addFields(
                                                                                                                                { name: `${currentGame['participants'][7]['summonerName']} | ${playerChampNumber6['name']}`, value: `${playerRank6[1]['queueType'].replace('_',' ').replace('_5x5',' DUO').replace('_SR','')}\n${playerRank6[1]['tier']} ${playerRank6[1]['rank']} ${playerRank6[1]['leaguePoints']} LP \n ${playerRank6[1]['wins']}W ${playerRank6[1]['losses']}L ${winrate}%`, inline: true },
                                                                                                                                )
                                                                                                                        }else{
                                                                                                                            console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                                        }}
                                                                                                                        if (!playerRank6[0]) {
                                                                                                                            ActualGameLol.addFields(
                                                                                                                                { name: `${currentGame['participants'][7]['summonerName']}`, value: `${playerChampNumber6['name']}`, inline: true },
                                                                                                                                )
                                                                                                                    }
                                                                                                                            leagueJs.StaticData.gettingChampionById(currentGame['participants'][3]['championId'])
                                                                                                                            .then((playerChampNumber7) => {
                                                                                                                                leagueJs.League.gettingEntriesForSummonerId(currentGame['participants'][3]['summonerId'])
                                                                                                                                .then((playerRank7) => {
                                                                                                                                    console.log(`${currentGame['participants'][3]['summonerName']} | ${playerChampNumber7['name']}`);
                                                                                                                                    if (playerRank7[0]) {
                                                                                                                                    if (playerRank7[0]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                                        const winrate = Math.round(playerRank7[0]['wins'] / (playerRank7[0]['wins'] + playerRank7[0]['losses'])*100);
                                                                                                                                        ActualGameLol.addFields(
                                                                                                                                            { name: `${currentGame['participants'][3]['summonerName']} | ${playerChampNumber7['name']}`, value: `${playerRank7[0]['queueType'].replace('_',' ').replace('_SR','').replace('_5x5',' DUO')}\n${playerRank7[0]['tier']} ${playerRank7[0]['rank']} ${playerRank7[0]['leaguePoints']} LP \n ${playerRank7[0]['wins']}W ${playerRank7[0]['losses']}L ${winrate}%`, inline: true },
                                                                                                                                            { name: '\u200B', value: '\u200B', inline: true },
                                                                                                                                            )
                                                                                                                                    }else{
                                                                                                                                        console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                                                    }}
                                                                                                                                    if (playerRank7[1]) {
                                                                                                                                    if (playerRank7[1]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                                        const winrate = Math.round(playerRank7[1]['wins'] / (playerRank7[1]['wins'] + playerRank7[1]['losses'])*100);
                                                                                                                                        ActualGameLol.addFields(
                                                                                                                                            { name: `${currentGame['participants'][3]['summonerName']} | ${playerChampNumber7['name']}`, value: `${playerRank7[1]['queueType'].replace('_',' ').replace('_5x5',' DUO').replace('_SR','')}\n${playerRank7[1]['tier']} ${playerRank7[1]['rank']} ${playerRank7[1]['leaguePoints']} LP \n ${playerRank7[1]['wins']}W ${playerRank7[1]['losses']}L ${winrate}%`, inline: true },
                                                                                                                                            { name: '\u200B', value: '\u200B', inline: true },
                                                                                                                                            )
                                                                                                                                    }else{
                                                                                                                                        console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                                                    }}
                                                                                                                                    if (!playerRank7[0]) {
                                                                                                                                        ActualGameLol.addFields(
                                                                                                                                            { name: `${currentGame['participants'][3]['summonerName']}`, value: `${playerChampNumber7['name']}`, inline: true },
                                                                                                                                            { name: '\u200B', value: '\u200B', inline: true },
                                                                                                                                            )
                                                                                                                                }
                                                                                                                                        leagueJs.StaticData.gettingChampionById(currentGame['participants'][8]['championId'])
                                                                                                                                        .then((playerChampNumber8) => {
                                                                                                                                            leagueJs.League.gettingEntriesForSummonerId(currentGame['participants'][8]['summonerId'])
                                                                                                                                            .then((playerRank8) => {
                                                                                                                                                console.log(`${currentGame['participants'][8]['summonerName']} | ${playerChampNumber8['name']}`);
                                                                                                                                                if (playerRank8[0]) {
                                                                                                                                                if (playerRank8[0]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                                                    const winrate = Math.round(playerRank8[0]['wins'] / (playerRank8[0]['wins'] + playerRank8[0]['losses'])*100);
                                                                                                                                                    ActualGameLol.addFields(
                                                                                                                                                        { name: `${currentGame['participants'][8]['summonerName']} | ${playerChampNumber8['name']}`, value: `${playerRank8[0]['queueType'].replace('_',' ').replace('_SR','').replace('_5x5',' DUO')}\n${playerRank8[0]['tier']} ${playerRank8[0]['rank']} ${playerRank8[0]['leaguePoints']} LP \n ${playerRank8[0]['wins']}W ${playerRank8[0]['losses']}L ${winrate}%`, inline: true },
                                                                                                                                                        )
                                                                                                                                                }else{
                                                                                                                                                    console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                                                                }}
                                                                                                                                                if (playerRank8[1]) {
                                                                                                                                                if (playerRank8[1]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                                                    const winrate = Math.round(playerRank8[1]['wins'] / (playerRank8[1]['wins'] + playerRank8[1]['losses'])*100);
                                                                                                                                                    ActualGameLol.addFields(
                                                                                                                                                        { name: `${currentGame['participants'][8]['summonerName']} | ${playerChampNumber8['name']}`, value: `${playerRank8[1]['queueType'].replace('_',' ').replace('_5x5',' DUO').replace('_SR','')}\n${playerRank8[1]['tier']} ${playerRank8[1]['rank']} ${playerRank8[1]['leaguePoints']} LP \n ${playerRank8[1]['wins']}W ${playerRank8[1]['losses']}L ${winrate}%`, inline: true },
                                                                                                                                                        )
                                                                                                                                                }else{
                                                                                                                                                    console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                                                                }}
                                                                                                                                                if (!playerRank8[0]) {
                                                                                                                                                    ActualGameLol.addFields(
                                                                                                                                                        { name: `${currentGame['participants'][8]['summonerName']}`, value: `${playerChampNumber8['name']}`, inline: true },
                                                                                                                                                        )
                                                                                                                                            }
                                                                                                                                                    leagueJs.StaticData.gettingChampionById(currentGame['participants'][4]['championId'])
                                                                                                                                                    .then((playerChampNumber9) => {
                                                                                                                                                        leagueJs.League.gettingEntriesForSummonerId(currentGame['participants'][4]['summonerId'])
                                                                                                                                                        .then((playerRank9) => {
                                                                                                                                                            console.log(`${currentGame['participants'][4]['summonerName']} | ${playerChampNumber9['name']}`);
                                                                                                                                                            if (playerRank9[0]) {
                                                                                                                                                            if (playerRank9[0]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                                                                const winrate = Math.round(playerRank9[0]['wins'] / (playerRank9[0]['wins'] + playerRank9[0]['losses'])*100);
                                                                                                                                                                ActualGameLol.addFields(
                                                                                                                                                                    { name: `${currentGame['participants'][4]['summonerName']} | ${playerChampNumber9['name']}`, value: `${playerRank9[0]['queueType'].replace('_',' ').replace('_SR','').replace('_5x5',' DUO')}\n${playerRank9[0]['tier']} ${playerRank9[0]['rank']} ${playerRank9[0]['leaguePoints']} LP \n ${playerRank9[0]['wins']}W ${playerRank9[0]['losses']}L ${winrate}%`, inline: true },
                                                                                                                                                                    { name: '\u200B', value: '\u200B', inline: true },
                                                                                                                                                                    )
                                                                                                                                                            }else{
                                                                                                                                                                console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                                                                            }}
                                                                                                                                                            if (playerRank9[1]) {
                                                                                                                                                            if (playerRank9[1]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                                                                const winrate = Math.round(playerRank9[1]['wins'] / (playerRank9[1]['wins'] + playerRank9[1]['losses'])*100);
                                                                                                                                                                ActualGameLol.addFields(
                                                                                                                                                                    { name: `${currentGame['participants'][4]['summonerName']} | ${playerChampNumber9['name']}`, value: `${playerRank9[1]['queueType'].replace('_',' ').replace('_5x5',' DUO').replace('_SR','')}\n${playerRank9[1]['tier']} ${playerRank9[1]['rank']} ${playerRank9[1]['leaguePoints']} LP \n ${playerRank9[1]['wins']}W ${playerRank9[1]['losses']}L ${winrate}%`, inline: true },
                                                                                                                                                                    { name: '\u200B', value: '\u200B', inline: true },
                                                                                                                                                                    )
                                                                                                                                                            }else{
                                                                                                                                                                console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                                                                            }}
                                                                                                                                                            if (!playerRank9[0]) {
                                                                                                                                                                ActualGameLol.addFields(
                                                                                                                                                                    { name: `${currentGame['participants'][4]['summonerName']}`, value: `${playerChampNumber9['name']}`, inline: true },
                                                                                                                                                                    { name: '\u200B', value: '\u200B', inline: true },
                                                                                                                                                                    )
                                                                                                                                                        }
                                                                                                                                                            leagueJs.StaticData.gettingChampionById(currentGame['participants'][9]['championId'])
                                                                                                                                                            .then((playerChampNumber10) => {
                                                                                                                                                                leagueJs.League.gettingEntriesForSummonerId(currentGame['participants'][9]['summonerId'])
                                                                                                                                                                .then((playerRank10) => {
                                                                                                                                                                    console.log(`${currentGame['participants'][9]['summonerName']} | ${playerChampNumber10['name']}`);
                                                                                                                                                                    if (playerRank10[0]) {
                                                                                                                                                                    if (playerRank10[0]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                                                                        const winrate = Math.round(playerRank10[0]['wins'] / (playerRank10[0]['wins'] + playerRank10[0]['losses'])*100);
                                                                                                                                                                        ActualGameLol.addFields(
                                                                                                                                                                            { name: `${currentGame['participants'][9]['summonerName']} | ${playerChampNumber10['name']}`, value: `${playerRank10[0]['queueType'].replace('_',' ').replace('_SR','').replace('_5x5',' DUO')}\n${playerRank10[0]['tier']} ${playerRank10[0]['rank']} ${playerRank10[0]['leaguePoints']} LP \n ${playerRank10[0]['wins']}W ${playerRank10[0]['losses']}L ${winrate}%`, inline: true },
                                                                                                                                                                            )
                                                                                                                                                                    }else{
                                                                                                                                                                        console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                                                                                    }}
                                                                                                                                                                    if (playerRank10[1]) {
                                                                                                                                                                    if (playerRank10[1]['queueType'] == 'RANKED_SOLO_5x5') {
                                                                                                                                                                        const winrate = Math.round(playerRank10[1]['wins'] / (playerRank10[1]['wins'] + playerRank10[1]['losses'])*100);
                                                                                                                                                                        ActualGameLol.addFields(
                                                                                                                                                                            { name: `${currentGame['participants'][9]['summonerName']} | ${playerChampNumber10['name']}`, value: `${playerRank10[1]['queueType'].replace('_',' ').replace('_5x5',' DUO').replace('_SR','')}\n${playerRank10[1]['tier']} ${playerRank10[1]['rank']} ${playerRank10[1]['leaguePoints']} LP \n ${playerRank10[1]['wins']}W ${playerRank10[1]['losses']}L ${winrate}%`, inline: true },
                                                                                                                                                                            )
                                                                                                                                                                    }else{
                                                                                                                                                                        console.log('Pas de Ranked Solo Duo ou Ranked Flex');
                                                                                                                                                                    }}
                                                                                                                                                                    if (!playerRank10[0]) {
                                                                                                                                                                        ActualGameLol.addFields(
                                                                                                                                                                            { name: `${currentGame['participants'][9]['summonerName']}`, value: `${playerChampNumber10['name']}`, inline: true },
                                                                                                                                                                            )
                                                                                                                                                                }
                                                                                                                                                                    interaction.editReply({ embeds: [ActualGameLol] });
                })
                })                                    
                })
                })                                    
                })
                })                                    
                })
                })                                    
                })
                })                                    
                })
                })                                    
                })
                })                                    
                })
                })                                    
                })
                })                                    
                })
                })                                        
                })
                })
                })
                })
                })
                })
                })
                })
                })
                })
                    }else{
                        
                }
            }).catch((err) => {
                interaction.editReply(`Il n'y a pas de game en cours pour ${account['name']}`);
            });
        }).catch((err) => {

        });
    }
}
