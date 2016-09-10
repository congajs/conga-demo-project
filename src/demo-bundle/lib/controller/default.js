const Controller = require('conga-framework').Controller;

/**
 * @Route("/")
 */
module.exports = class DefaultController extends Controller {

    /**
     * @Route("/", name="default.index", methods=["GET"])
     * @Template
     */
    index(req, res) {
        res.return();
    }

    /**
     * @Route("/hello/:name", name="default.hello", methods=["GET"])
     * @Template
     */
    hello(req, res) {
        res.return(req.params.name);
    }
}