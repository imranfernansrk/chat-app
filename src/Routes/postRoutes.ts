import { Application } from "express";
import PostController from '../Controllers/postController'

class PostRoutes {
    private postController: PostController
    constructor() {
        this.postController = new PostController();
    }

    public initialRoutes(application: Application) {
        application.route('/createPost').post(this.postController.createPost);
        application.route('/post/:id').get(this.postController.getPostById);
        application.route('/userFeeds/:id').get(this.postController.getUserFeedsByUserId);
        application.route('/posts/:id').get(this.postController.getAllPostsByOwnerId);
        application.route('/post/:id').put(this.postController.updatePostCaptionById);
        application.route('/deletePost/:id').delete(this.postController.deletePostById);
        application.route('/deleteAllPosts/:id').delete(this.postController.deleteAllPostsByUserId);
    }
}

export default PostRoutes;