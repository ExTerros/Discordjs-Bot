module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Connecté comme ${ client.user.tag }!`);
		client.user.setStatus('dnd');
		client.user.setActivity('écrire des ligne de code');
	},
};