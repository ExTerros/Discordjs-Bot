const { default: axios } = require('axios');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription("Photo aléatoire de chien"),
	async execute(interaction) {
		const dogResult = await axios.get('https://random.dog/woof.json');
		await interaction.reply({ files: [dogResult.data['url']] });
	},
};