module.exports = class AuthorizationFilter {

	constructor(container) {
		this.container = container;
	}

	run(req, res, options, cb) {

		// get our database manager
		const manager = this.container.get('bass').createSession().getManager('nedb.default');

		// get the REST manager
		const restManager = this.container.get('rest');

		// get the auth token from headers
		const authToken = req.get('authorization');

		// make sure auth token isn't blank
		if (typeof authToken === 'undefined' || authToken === '' || authToken === null) {
			return restManager.createBadRequestResponse(rest, [{"message": "Missing Authorization header"}]);
		}

		// find the token in the database
		manager.find('Token', authToken).then(function(token) {

			if (token){

				// store user in request to retrieve later on
				req._USER = token.user;
				cb();

			} else {

				return restManager.createBadRequestResponse(res, []);
			}
		},
		function(err){
			return restManager.createInternalServerErrorResponse(res);
		});	
	}
}