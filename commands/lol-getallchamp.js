const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { default: axios } = require("axios");
const fs = require('node:fs');
const { developerriotgameskey } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('rotachamp')
	.setDescription('Champion en rotation Lol'),
    async execute(interaction){
        //get last version of league of legends
        const lolVersion = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
        const lolLastVersion = lolVersion.data[0];
        //get list of league of legends champion 
        const ddragonJson = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${lolLastVersion}/data/fr_FR/champion.json`);
        const championList = ddragonJson.data['data']
        // get champion rotation
        const rotationChampionList = await axios.get(`https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${developerriotgameskey}`)
        const freeChampionIds = rotationChampionList.data['freeChampionIds']
        const freeChampionIdsForNewPlayers = rotationChampionList.data['maxNewPlayerLevel']
        const rotationChampionNewPlayer = rotationChampionList['data']['freeChampionIdsForNewPlayers']

function name(params) {
    
}


        for (let i = 0; i < freeChampionIds.length; i++) {
            const element = freeChampionIds[i];
            console.log(element);
        }

    }
}