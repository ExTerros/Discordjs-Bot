const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('votetest')
		.setDescription("créer un vote")
		.addStringOption(option =>
			option
				.setName('message')
				.setDescription('Votre message')
				.setRequired(true)),
	async execute(interaction) {
		// interaction.channel.send("@everyone");
		const alreadyPressed = []

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

		//if user click do this for eache user

		// collector.on('collect', async i => {
		// 	const newEmbed = EmbedBuilder.from(poolEmbed)
		// 		.addFields(
		// 			{ name: `${i.customId}`, value: `**${i.user.username}**` },
		// 		)
		// 	await i.update({ embeds: [newEmbed], components: [row], fetchReply: true });
		// 	const message = interaction.options.data
		// 	console.log(message);
		// });

		
		collector.on('collect', async i => {
			if (!!alreadyPressed.find(id => {  
				return id.ID === i.user.id+i.message.id
			  })) {
				i.reply({ content: `Tu à déjà voter ${i.user.username}!`, ephemeral: true })
			  } else {
				const newEmbed = EmbedBuilder.from(poolEmbed)
				.addFields(
					{ name: `${i.customId}`, value: `**${i.user.username}**` },
				)
				i.update({ embeds: [newEmbed], components: [row], fetchReply: true });
				alreadyPressed.push({ID: i.user.id+i.message.id})
			}
		console.log(alreadyPressed);

		});  

		
		


	},
};