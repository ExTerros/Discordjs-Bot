const { SlashCommandBuilder } = require('discord.js');
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'fr' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tictactoe')
		.setDescription("Joue au TicTacToe")
		.addUserOption(option =>
			option.setName('opponent')
				.setDescription('Vous voulez jouer contre qui ?')
				.setRequired(false)),
	async execute(interaction) {
		game.handleInteraction(interaction);
	},
};