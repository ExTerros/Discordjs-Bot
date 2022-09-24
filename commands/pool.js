const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');



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
		interaction.channel.send("@everyone");

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('✅')
					.setLabel('Oui ✅')
					.setStyle(ButtonStyle.Success))
			.addComponents(
				new ButtonBuilder()
					.setCustomId('🤔')
					.setLabel('Peut-être 🤔')
					.setStyle(ButtonStyle.Secondary))
			.addComponents(
				new ButtonBuilder()
					.setCustomId('❌')
					.setLabel('Non ❌')
					.setStyle(ButtonStyle.Danger),
			);

		const message = interaction.options.getString('message');
		const poolEmbed = new EmbedBuilder()
		.setAuthor({ name: "📊 Nouveau Vote"})
		.setColor('#30C0FF')
		.setTitle(message)

		await interaction.reply({ embeds: [poolEmbed], fetchReply: true, components: [row] });

		const collector = interaction.channel.createMessageComponentCollector();

		collector.on('collect', async i => {
			const newEmbed = EmbedBuilder.from(poolEmbed)
				.setDescription(`${i.customId} ${interaction.user.tag}`)
			await i.update({ embeds: [newEmbed], components: [row] });
		});
	},
};