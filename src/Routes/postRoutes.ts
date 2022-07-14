import { Application } from "express";
import { PostController } from '../Controllers';
import { Auth } from "../Auth/Authentication";

class PostRoutes {
    private postController: PostController
    private auth: Auth;
    constructor() {
        this.postController = new PostController();
        this.auth = new Auth();
    }

    public initialRoutes(application: Application) {
        application.route('/createPost').post(this.auth.checkValidUser, this.postController.createPost);
        application.route('/post/:id').get(this.auth.checkValidUser, this.postController.getPostById);
        application.route('/userFeeds/:id').get(this.auth.checkValidUser, this.postController.getUserFeedsByUserId);
        application.route('/posts/:id').get(this.auth.checkValidUser, this.postController.getAllPostsByOwnerId);
        application.route('/post/:id').put(this.auth.checkValidUser, this.postController.updatePostCaptionById);
        application.route('/deletePost/:id').delete(this.auth.checkValidUser, this.postController.deletePostById);
        application.route('/deleteAllPosts/:id').delete(this.auth.checkValidUser, this.postController.deleteAllPostsByUserId);
    }
}

export default PostRoutes;