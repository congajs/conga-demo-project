/**
 * The UserListener class is registered with Bass to automatically hash a user's password
 * when a User is created or updated
 * 
 */
module.exports = class UserListener {

    /**
     * Construct with conga container
     * 
     * @param  {Container} container
     * @return {Void}
     */
    constructor(container) {
        this.container = container;
    }

    /**
     * Hash password when a User is first created
     * 
     * @param  {Object}   event
     * @param  {Function} cb
     * @return {Void}
     */
    onPrePersist(event, cb) {
        this.hashUserPassword(event.document, function() {
            cb();
        });
    }

    /**
     * Hash password when a User is first created
     * 
     * @param  {Object}   event
     * @param  {Function} cb
     * @return {Void}
     */
    onPreUpdate(event, cb) {

        const doc = event.document;

        // check if there is a new password
        // we are comparing the data that was loaded vs. the data that is about to be saved
        if (typeof doc.__loadedData !== 'undefined' && document.__loadedData['password'] !== doc.password) {
            this.hashUserPassword(doc, cb);
        } else {
            cb();           
        }
    }

    /**
     * Use bcrypt to hash the password on the User
     * 
     * @param  {User }    user
     * @param  {Function} cb
     * @return {Void}
     */
    hashUserPassword(user, cb) {

        const bcrypt = this.container.get('bcrypt');

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                cb();
            });
        });
    }
}
