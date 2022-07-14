import { PostDao } from "../Dao/postDao";
import { UserDao } from "../Dao/userDao";
import { UserRelationDao } from "../Dao/userRelationDao";
import { Post } from "../Utils/Types";
import { Response } from "../Utils/Response";

export default class PostService {
    private postDao: PostDao;
    private userDao: UserDao;
    private userRelationDao: UserRelationDao;
    constructor() {
        this.postDao = new PostDao();
        this.userDao = new UserDao();
        this.userRelationDao = new UserRelationDao();
    }

    public async createPost(data: Post): Promise<any> {
        console.log('createPost service input', data);
        try {
            let user = await this.userDao.getUserByUserId(data.ownerId);
            console.log('return value from getUserByUserId: user: ', user);
            if (!user && !user._id) {
                console.log('return from createPost service', user);
                return Response.fileNotFound();
            }
            const newPost = await this.postDao.createPost(data);
            console.log('return from createPost service', Object.assign({}, newPost));
            return Response.success(Object.assign({}, newPost));
        } catch (error) {
            console.log('return from createPost service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getPostById(id: string): Promise<any> {
        console.log('getPostById service input ownerId', id);
        try {
            let post = await this.postDao.getPostById(id);
            console.log('return from getPostById service', Object.assign({}, post));
            return Response.success(Object.assign({}, post));
        } catch (error) {
            console.log('return from getPostById service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getAllPostsByOwnerId(ownerId: string): Promise<any> {
        console.log('getAllPostsByOwnerId service input ownerId', ownerId);
        try {
            let user = await this.userDao.getUserByUserId(ownerId);
            console.log('return value from getUserByUserId: user: ', user);
            if (!user && !user._id) {
                console.log('return from getAllPostsByOwnerId service', user);
                return Response.fileNotFound();
            }
            const posts = await this.postDao.getAllPostsByOwnerId(ownerId);
            console.log('return from getAllPostsByOwnerId service', Object.assign([], posts));
            return Response.success(Object.assign([], posts));
        } catch (error) {
            console.log('return from getAllPostsByOwnerId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getAllPostsByUserIds(userIds: string[]): Promise<any> {
        console.log('getAllPostsByUserIds service input userIds', userIds);
        try {
            const posts = await this.postDao.getAllPostsByUserIds(userIds);
            console.log('return from getAllPostsByUserIds service', Object.assign([], posts));
            return Response.success(Object.assign([], posts));
        } catch (error) {
            console.log('return from getAllPostsByUserIds service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getUserFeedsByUserId(userId: string): Promise<any> {
        console.log('getUserFeedsByUserId service input userId', userId);
        try {
            const followingUsers = await this.userRelationDao.getFollowingUsersByUserId(userId);
            console.log('return value from getFollowingUsersByUserId method', Object.assign([], followingUsers));
            const ids = followingUsers.map(user => user._id);
            console.log('checkking value of ids', ids);
            const feeds = this.getAllPostsByUserIds(ids);
            console.log('return from getUserFeedsByUserId', Object.assign([], feeds));
            return Response.success(Object.assign([], feeds));
        } catch (error) {
            console.log('return from getUserFeedsByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async updatePostCaptionById(id: string, caption: string): Promise<any> {
        console.log('updatePostCaptionById service input id', id);
        console.log('updatePostCaptionById service input caption', caption);
        try {
            let existingPost = await this.postDao.getPostById(id);
            console.log('return value from getPostById: existingPost: ', existingPost);
            if (!existingPost && !existingPost._id) {
                console.log('return from updatePostCaptionById service', existingPost);
                return Response.fileNotFound();
            }
            const updatedPost = await this.postDao.updatePostCaptionById(id, caption);
            console.log('return from updatePostCaptionById service', Object.assign({}, updatedPost));
            return Response.success(Object.assign({}, updatedPost));
        } catch (error) {
            console.log('return from updatePostCaptionById service', error);
            return Response.badRequest(error.message);
        }
    }

    public async deletePostById(id: string): Promise<any> {
        console.log('deletePostById service input id', id);
        try {
            let existingPost = await this.postDao.getPostById(id);
            console.log('return value from getPostById: existingPost: ', existingPost);
            if (!existingPost && !existingPost._id) {
                console.log('return from deletePostById service', existingPost);
                return Response.fileNotFound();
            }
            const deletedPost = await this.postDao.deletePostById(id);
            console.log('return from deletePostById service', Object.assign({}, deletedPost));
            return Response.success(Object.assign({}, deletedPost));
        } catch (error) {
            console.log('return from deletePostById service', error);
            return Response.badRequest(error.message);
        }
    }

    public async deleteAllPostsByUserId(userId: string): Promise<any> {
        console.log('deleteAllPostsByUserId service input userId', userId);
        try {
            let user = await this.userDao.getUserByUserId(userId);
            console.log('return value from getUserByUserId: existingPost: ', user);
            if (!user && !user._id) {
                console.log('return from deleteAllPostsByUserId service', user);
                return Response.fileNotFound();
            }
            const deletedPosts = await this.postDao.deleteAllPostsByUserId(userId);
            console.log('return from deleteAllPostsByUserId service', Object.assign([], deletedPosts));
            return Response.success(Object.assign([], deletedPosts));
        } catch (error) {
            console.log('return from deleteAllPostsByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

}