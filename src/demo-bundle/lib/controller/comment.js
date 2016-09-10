const Controller = require('conga-rest').RestController;

/**
 * @Route("/api/comment")
 * @Rest:Controller(adapter="conga-rest:adapter/bass",
 *                  adapterOptions={documentManager:"nedb.default", model:"Comment"},
 *                  type="comments",
 *                  isPaginationEnabled=true,
 *                  defaultLimit=10,
 *                  isIncludeRelatedSupported=true
 * )
 * 
 * @PreFilter(service="authorization.filter", parameters={})
 */
module.exports = class CommentController extends Controller {

    /**
     * Modify the comment before it is persisted
     * 
     * @param  {Object}   req
     * @param  {Object}   res
     * @param  {Object}   object
     * @param  {Function} cb
     * @return {Void}
     */
    onCreate(req, res, object, cb) {

        // set the authorized user from the request on comment
        object.user = req._USER;

        cb();
    }
}