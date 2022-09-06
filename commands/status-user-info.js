const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment');
moment.locale('fr');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription("Répond avec les info de l'utilisateur!"),
	async execute(interaction) {
		await interaction.reply(`Ton tag: ${interaction.user.tag}\nTon id: ${interaction.user.id}\nCompte crée le: ${moment(interaction.user.createdAt).format('LLLL')}`);
	},
};