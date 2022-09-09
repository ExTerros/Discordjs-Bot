module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Connecté comme ${ client.user.tag }!`);
		client.user.setStatus('online');
		client.user.setActivity('Farming Simulator 2045');
	},
};