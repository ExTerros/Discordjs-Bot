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
		const alreadyPressed = []
		const whoPoolWhat = []

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
		.setTimestamp()

		await interaction.reply({ embeds: [poolEmbed], fetchReply: true, components: [row] });

		const collector = interaction.channel.createMessageComponentCollector();
		
		collector.on('collect', async i => {
			if (!!alreadyPressed.find(id => {  
				return id.ID === i.user.id+i.message.id
			  })) {
				i.reply({ content: `Tu à déjà voter ${i.user.username}!`, ephemeral: true })
			  } else {
				whoPoolWhat.push({what: `${i.customId}`, who:`**${i.user.username}**`})

				const newEmbed = EmbedBuilder.from(poolEmbed)
				whoPoolWhat.forEach(pool => {
					newEmbed.addFields(
						{ name: pool['what'], value: `**${pool['who']}**`, inline: true},
					)
				});

				i.update({ embeds: [newEmbed],  fetchReply: true });

				alreadyPressed.push({ID: i.user.id+i.message.id})
			}
		});  

	},
};