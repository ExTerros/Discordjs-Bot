const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { default: axios } = require("axios");
const { xivapikey } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('ffxivplayer')
	.setDescription('Répond avec le profil ff14!')
	.addStringOption(option =>
		option
			.setName('prenom')
			.setDescription('Prenom de votre personnage')
			.setRequired(true))
	.addStringOption(option =>
		option
			.setName('nom')
			.setDescription('Nom de votre personnage')
			.setRequired(true)),
	async execute(interaction) {
		//Get option user
		var prenom = interaction.options.getString('prenom');
		var nom = interaction.options.getString('nom');
        await interaction.reply('Je recherche le personnage');
		const strPrenom = prenom.charAt(0).toUpperCase() + prenom.slice(1);
		const strNom = nom.charAt(0).toUpperCase() + nom.slice(1);


		axios.get(`https://xivapi.com/character/search?name=${strPrenom}+${strNom}&server=Omega&private_key=${xivapikey}`).then((response) => {
			if (response.data['Pagination']['Results'] === 0) return interaction.reply(`Pas de joueur sous le nom de \`${strPrenom} ${strNom}\` trouvé sur \`Omega.\``);
			const id = response.data['Results'][0]['ID'];
			console.log(id);
			axios.get(`https://xivapi.com/character/${id}?data=MIMO&private_key=${xivapikey}`).then((char) => {
				const PlayerEmbed = new EmbedBuilder()
				.setColor('#FFC107')
				.setAuthor({ name: char.data['Character']['Name'], iconURL: char.data['Character']['Avatar'] })
				.addFields(
					{ name: 'Classe Actuel', value: `${char.data['Character']['ActiveClassJob']['UnlockedState']['Name']}, Level: ${char.data['Character']['ActiveClassJob']['Level']}`  },
					{ name: 'Compagnie libre', value: `${char.data['Character']['FreeCompanyName']}` },
				)
				.addFields({ name: "Lien", value: `[Lodestone](https://fr.finalfantasyxiv.com/lodestone/character/${id})\n[FFXIV Collect](https://ffxivcollect.com/characters/${id})` },)
				.setImage(char.data['Character']['Portrait'])

				if(char.data['Minions']){

					const newEmbed = EmbedBuilder.from(PlayerEmbed)
					.addFields(
					{ name: 'Mascotes', value: `${Object.keys(char.data['Minions']).length}`, inline: true },
					{ name: 'Montures', value: `${Object.keys(char.data['Mounts']).length}`, inline: true},
					)
					interaction.editReply({ embeds: [newEmbed] });
												
				}else{
					interaction.editReply({ embeds: [PlayerEmbed] });
				}
				
			})
		}).catch((error) => {
			console.log("error: " + error);
		});

	},
};