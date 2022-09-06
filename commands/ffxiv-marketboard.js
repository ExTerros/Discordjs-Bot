const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder, TextChannel } = require('discord.js');
const dcs = ["Aether", "Chaos", "Crystal", "Elemental", "Gaia", "Korea", "Light", "Mana", "Primal", "猫小胖", "莫古力", "陆行鸟, '39'"];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('marketboard')
		.setDescription("Prix Marketboard")
		.addStringOption(option =>
			option
				.setName('item')
				.setDescription('Le nom de votre Item')
				.setRequired(true)),
	async execute(interaction) {
		//const value
		const term = interaction.options.getString('item');
		const monde = '39';
		const args = [monde, term]
		console.log(args[0])
        args[0] = args[0][0].toUpperCase() + args[0].substr(1).toLowerCase();
        const searchTerm = args.join("+").substring(args[0].length + 1); // the item the user is trying to purchase*

		axios.get(`https://xivapi.com/search?language=fr`, {
				data: `{"indexes":"item","columns":"ID,Name,Icon","body":{"query":{"bool":{"must":[{"wildcard":{"NameCombined_fr":"*${searchTerm}*"}}]}},"from":0,"size":100}}`
        })
        .then((response) => {
            //console.log(response.data);
            if (response.data['Pagination']['ResultsTotal'] === 0) return interaction.reply({ content: "Pas d'items trouvé", ephemeral: true });

            // console.log("name: " + response.data['Results'][0]["Name"]); // got info!!
            // console.log("id: " + response.data['Results'][0]["ID"]);

            axios.get(`https://universalis.app/api/${args[0]}/${response.data['Results'][0]["ID"]}?listings=10`)
            .then((uvResponse) => {
                if (Object.keys(uvResponse.data['listings']).length === 0) return interaction.reply({ content: "Aucune liste de vente trouvé", ephemeral: true });
                const priceDataEmbed = new EmbedBuilder()
				.setTitle(`${args[0]} ${response.data['Results'][0]["Name"]} en vente`)
				.setFooter({
					text: 'Using Universalis API',
					iconURL: 'https://universalis.app/i/universalis/universalis.png',
				  })
				.setColor('#FFC107')
				.setURL(`https://universalis.app/market/${response.data['Results'][0]["ID"]}`)
				.setThumbnail(`https://universalis-ffxiv.github.io/universalis-assets/icon2x/${response.data['Results'][0]["ID"]}.png`)
				.setDescription(`**Minimum price**: ${uvResponse.data['minPrice']}\n**Minimum price (HQ)**: ${uvResponse.data['minPriceHQ']}\n` + 
				`**Average Price (NQ)**: ${uvResponse.data['averagePriceNQ']}\n**Average Price (HQ)**: ${uvResponse.data['averagePriceHQ']}\n`);
				
			let priceString = "";
			let worldString = "";
			let hqString = "";
			for (let i = 0; i < Object.keys(uvResponse.data['listings']).length; i++){
				//console.log(uvResponse.data['listings'][i]); // debug
				priceString += `${uvResponse.data['listings'][i]['pricePerUnit']}g x ${uvResponse.data['listings'][i]['quantity']}`;
				worldString += `${uvResponse.data['worldName']}`;
				hqString += uvResponse.data['listings'][i]['hq'] ? "HQ" : "NQ";
				if (i != Object.keys(uvResponse.data['listings']).length - 1){ // add new line if not the last one!
					priceString = priceString + "\n";
					worldString = worldString + "\n";
					hqString += "\n";
				}
			}
			
			const newEmbed = EmbedBuilder.from(priceDataEmbed)
			.addFields(
				{ name: 'Price/Quantity', value: priceString, inline: true },
				{ name: 'Quality', value: hqString , inline: true},
				{ name: 'Server', value: worldString, inline: true },)
				interaction.reply({ embeds: [newEmbed] });
		})
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
            return interaction.reply("There was a problem reaching XIVAPI. Please try again later.");
        });
	},
};