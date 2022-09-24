
const { SlashCommandBuilder, InteractionType } = require('discord.js');
const akinator = require("discord.js-akinator");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('akinator')
		.setDescription("akinator")
		.addStringOption(option =>
			option.setName('category')
				.setDescription('The gif category')
				.setRequired(true)
				.addChoices(
					{ name: 'animal', value: 'animal' },
					{ name: 'character', value: 'character' },
					{ name: 'object', value: 'object' },
				)),
	async execute(interaction) {
        let category = interaction.options.getString('category')
		akinator(interaction, {
            language: "fr", // Defaults to "en"
            childMode: false, // Defaults to "false"
            gameType: category, // Defaults to "character"
            useButtons: true, // Defaults to "false"
            embedColor: "#92c0d3" // Defaults to "Random"
        });
	},
};