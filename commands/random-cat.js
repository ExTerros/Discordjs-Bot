const { default: axios } = require('axios');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription("Photo aléatoire de chat"),
	async execute(interaction) {
		const catResult = await axios.get('https://aws.random.cat/meow');
		await interaction.reply({ files: [catResult.data['file']] });
	},
};