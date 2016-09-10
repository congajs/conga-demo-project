const Controller = require('conga-rest').RestController;

/**
 * @Route("/api/post")
 * @Rest:Controller(adapter="conga-rest:adapter/bass",
 * 					adapterOptions={documentManager:"nedb.default", model:"Post"},
 *                  type="posts",
 *                  allowedMethods=["findAll","find","findRelationship",
 *                  				"findRelationships","create","update","remove","updateRelationship"],
 *                  isPaginationEnabled=true,
 *                  defaultLimit=1000,
 *                  isIncludeRelatedSupported=true
 * )
 * @Websocket(namespace="/api")
 * 
 * @-PreFilter(service="authorization.filter", parameters={})
 */
module.exports = class PostController extends Controller {

}