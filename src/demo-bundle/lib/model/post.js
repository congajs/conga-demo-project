/**
 * @Bass:Document(collection="posts")
 * @Rest:Resource(type="posts")
 */
module.exports = class Post {

    constructor() {

        /**
         * @Bass:Id
         * @Bass:Field(type="ObjectID", name="_id")
         * @Rest:ID
         */
        this.id = null;

        /**
         * @Bass:Field(type="String", name="title")
         * @Assert:NotBlank
         * @Rest:Attribute
         */
        this.title = null;

        /**
         * @Bass:Field(type="String", name="body")
         * @Assert:NotBlank
         * @Rest:Attribute
         * @Rest:Filter
         */
        this.body = null;

        /**
         * @Bass:OneToOne(document="User", name="user_id")
         * @Rest:Relationship(type="one", relatedType="users")
         * @Rest:Filter
         */
        this.user = null;

        /**
         * @Bass:OneToMany(document="Comment")
         * @Rest:Relationship(type="many", relatedType="comments")
         */
        this.comments = [];

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
     * @Bass:PrePersist
     */
    onPrePersist(evt, cb) {
        
        // do something before Post is saved
        cb(null);
    }

    /**
     * @Bass:PostPersist
     */
    onPostPersist(evt, cb) {
        
        // do something after Post is saved
        cb(null);
    }

}