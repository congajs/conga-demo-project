var os = require('os');

const Controller = require('conga-framework').Controller;

/**
 * 
 * @Websocket(namespace="/api")
 * 
 * @-PreFilter(service="authorization.filter", parameters={})
 */
module.exports = class WebsocketController extends Controller {

	/**
	 * @Route(name="hello.world")
	 */
	helloWorld(req, res) {
		res.return({ hello: "world" })
	}

	/**
	 * @Route(name="server.info")
	 */
	serverInfo(req, res) {
		res.return({
			hostname: os.hostname(),
			type: os.type(),
			platform: os.platform(),
			architecture: os.arch()
		});
	}
}