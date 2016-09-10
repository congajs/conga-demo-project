const crypto = require('crypto');
const Controller = require('conga-rest').RestController;

/**
 * @Route("/api/token")
 * @Rest:Controller(adapter="conga-rest:adapter/bass",
 *                  adapterOptions={documentManager:"nedb.default", model:"Token"},
 *                  type="tokens",
 *                  allowedMethods=["create", "remove"]
 * )
 */
module.exports = class TokenController extends Controller {

    /**
     * @Rest:Listener(event="create")
     */
    onCreate(req, res, resource, adapter, cb) {

        var manager = adapter.manager;
        var restManager = this.restManager;
        var bcrypt = this.container.get('bcrypt');

        // try to load user by email
        manager.findOneBy('User', { email: resource.email }).then(function(user) {

            if (user) {

                // validate password
                if (bcrypt.compareSync(resource.password, user.password)){

                    // generate unique token and use it as the id
                    resource.id = crypto.createHash('sha1').update((new Date()).valueOf().toString() + Math.random().toString()).digest('hex');
                    resource.user = user;

                    // expire in 30 days
                    var now = new Date();
                    now.setDate(now.getDate() + 30);
                    resource.expiresAt = now;

                    manager.persist(resource)

                    manager.flush().then(function(){

                        // return the resource for response
                        cb(null, resource);
                    }); 

                // invalid password
                } else {
                    cb(restManager.generateBadRequestError({ email: 'Invalid Login'} ));
                }

            // user not found
            } else {
                cb(restManager.generateNotFoundError());
            }
        },

        // bass error
        function(err) {
            cb(restManager.generateInternalServerError());
        });
    }

    /**
     * @Route("/", methods=["POST"])
     * 
     * @param req
     * @param response
     */
    create(req, res) {

        var manager = this.container.get('bass').createSession().getManager('nedb.default');
        var restManager = this.restManager;
        var bcrypt = this.container.get('bcrypt');

        // deserialize the request body to a model
        var resource = this.restManager.deserialize(this.type, req.body);

        manager.findOneBy('User', { email: resource.email }).then(function(user) {

            if (user) {

                // validate password
                if (bcrypt.compareSync(resource.password, user.password)) {

                    // generate unique token
                    resource.id = crypto.createHash('sha1').update((new Date()).valueOf().toString() + Math.random().toString()).digest('hex');
                    resource.user = user;

                    // expire in 30 days
                    var now = new Date();
                    now.setDate(now.getDate() + 30);
                    resource.expiresAt = now;

                    manager.persist(resource)

                    manager.flush().then(function() {
                        res.return(restManager.serialize(resource));
                    }); 

                } else {
                    res.return(false);
                }

            } else {

                res.status(500).send();
            }
        },
        function(err) {
            
            cb(restManager.generateInternalServerError());
        });
    }
}