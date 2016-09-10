const Controller = require('conga-rest').RestController;

/**
 * @Route("/api/user")
 * @Rest:Controller(adapter="conga-rest:adapter/bass",
 * 					adapterOptions={documentManager:"nedb.default", model:"User"},
 *                  type="users",
 *                  allowedMethods=["findAll", "find", "create", "update", "remove"],
 *                  defaultPageSize=100
 * )
 * @-PreFilter(service="authorization.filter", options={exclude=["create"]})
 */
module.exports = class UserController extends Controller {

}