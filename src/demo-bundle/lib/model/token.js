/**
 * @Bass:Document(collection="tokens")
 * @Rest:Resource(type="tokens")
 */
module.exports = class Token {

	constructor() {

	    /**
	     * @Bass:Id(strategy="MANUAL")
	     * @Bass:Field(type="ObjectID", name="_id")
	     * @Rest:ID
	     */
	    this.id = null;

		/**
		 * @Rest:Attribute(expose=false)
		 */
		this.email = null;

		/**
		 * @Rest:Attribute(expose=false)
		 */
		this.password = null;

		/**
		 * @Bass:Field(type="Date", name="expires_at")
		 * @Rest:Attribute
		 */
		this.expiresAt = null;

		/**
	     * @Bass:OneToOne(document="User", name="user_id")
		 * @Rest:Relationship(type="one", relatedType="users")
		 */
		this.user = null;

	}
}