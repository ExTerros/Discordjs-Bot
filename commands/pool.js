const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription("créer un vote")
		.addStringOption(option =>
			option
				.setName('message')
				.setDescription('Votre message')
				.setRequired(true)),
	async execute(interaction) {
		const message = interaction.options.getString('message');
		const poolEmbed = new EmbedBuilder()
		.setAuthor({ name: "📊 Nouveau Vote"})
		.setColor('#30C0FF')
		.setTitle(message)

		const vote = await interaction.reply({ embeds: [poolEmbed], fetchReply: true });
		vote.react('✅');
		vote.react('🤔');
		vote.react('❌');


	},
};