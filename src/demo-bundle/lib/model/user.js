/**
 * @Bass:Document(collection="users")
 * @Bass:DocumentListener("user.listener")
 * @Rest:Resource(type="users")
 */
module.exports = class User {

    constructor() {

        /**
         * @Bass:Id
         * @Bass:Field(type="ObjectID", name="_id")
         * @Rest:ID
         */
        this.id = null;

        /**
         * @Bass:Field(type="String", name="email")
         * @Rest:Attribute
         * @Assert:NotBlank
         * @-Assert:Regex(pattern="^[^@]+@\.[a-z]{2,}")
         */
        this.email = null;

        /**
         * @Bass:Field(type="String", name="password")
         * @Assert:NotBlank
         * @Bass:Unique
         * @Rest:Attribute(expose=false)
         */
        this.password = null;

        /**
         * @Bass:Field(type="Array", name="roles")
         * @Rest:Attribute
         */
        this.roles = [User.ROLE_USER];

        /**
         * @Bass:Field(type="String", name="first_name")
         * @Assert:NotBlank
         * @Rest:Attribute
         */
        this.firstName = null;

        /**
         * @Bass:Field(type="String", name="last_name")
         * @Assert:NotBlank
         * @Rest:Attribute
         */
        this.lastName = null;

        /**
         * @Bass:Version
         * @Bass:Field(type="Number", name="version")
         * @Rest:Attribute
         */
        this.version = 0;

        /**
         * @Bass:CreatedAt
         * @Bass:Field(type="Date", name="created_at")
         * @Rest:Attribute
         */
        this.createdAt = null;

        /**
         * @Bass:UpdatedAt
         * @Bass:Field(type="Date", name="updated_at")
         * @Rest:Attribute
         */
        this.updatedAt = null;

    }

    /**
     * USER Role
     */
    static get ROLE_USER() {
        return 1;
    }

    /**
     * ADMIN Role
     */
    static get ROLE_ADMIN() {
        return 2;
    }

}