const process = require('process');
const pusage = require('pidusage')

module.exports = class SocketIoService {

	constructor(container) {
		this.container = container;
		this.sockets = {};
		this.init();
	}

	init() {

		const sockets = this.sockets;

		const loop = function() {

			const keys = Object.keys(sockets);

			if (keys.length > 0) {

				pusage.stat(process.pid, function(err, stat) {
					keys.forEach(function(id){
						if (typeof sockets[id] !== 'undefined') {
							sockets[id].emit('data', { cpu: stat.cpu, memory: stat.memory });
						}
					});
				});
			}
		};

		setInterval(loop, 500);
	}

	onConnect(evt, cb) {
		this.sockets[evt.socket.id] = evt.socket;
		cb();
	}

	onDisconnect(evt, cb) {
		delete this.sockets[evt.socket.id];
	}
}