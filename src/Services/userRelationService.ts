import { UserRelationDao, UserDao } from "../Dao";
import { UserRelationIds, RelationType } from "../Utils/Types";
import { Response, RESPONSE_MEESAGE } from "../Utils/Response";

export default class UserRelationService {
    private userRelationDao: UserRelationDao;
    private userDao: UserDao;
    constructor() {
        this.userRelationDao = new UserRelationDao();
        this.userDao = new UserDao();
    }

    public async sendUserRequest(data: UserRelationIds): Promise<any> {
        console.log('createUserRelation service input', data);
        try {
            let user = await this.userDao.getUserByUserId(data.userId);
            let follower = await this.userDao.getUserByUserId(data.followerId);
            console.log('check user and follower: user: ', user);
            console.log('check user and follower: follower: ', follower);
            if (!user?._id || !follower?._id) {
                console.log('return from createUserRelation service');
                return Response.fileNotFound();
            }
            let existingRelation = await this.userRelationDao.getUserRelationByIds(data);
            console.log('return value from getUserRelationByUserId: existingRelation: ', existingRelation);
            if(existingRelation && existingRelation._id){
                if(existingRelation.type == RelationType.requested){
                    console.log('return from createUserRelation service');
                    return Response.badRequest("Request already sent to account");
                }
                console.log('return from createUserRelation service');
                return Response.badRequest("User is currently following this account");
            }
            const type: RelationType = RelationType.requested;
            const userRelation = await this.userRelationDao.createUserRelation({...data, type });
            console.log('return from createUserRelation service', Object.assign({}, userRelation));
            return Response.success(Object.assign({}, userRelation));
        } catch (error) {
            console.log('return from createUserRelation service', error);
            return Response.badRequest(error.message);
        }
    }

    public async acceptUserRequestById(id: string): Promise<any> {
        console.log('acceptUserRequest service id', id);
        try {
            let existingRelation = await this.userRelationDao.getUserRelationById(id);
            console.log('return value from getUserRelationById: existingRelation: ', existingRelation);
            if(!existingRelation && !existingRelation._id){
                console.log('return from acceptUserRequest service');
                return Response.badRequest("User wasn't send request yet");
            }
            const type: RelationType = RelationType.following;
            const userRelation = await this.userRelationDao.updateUserRelationTypeById(existingRelation._id, type);
            console.log('return from acceptUserRequest service', Object.assign({}, userRelation));
            return Response.success(Object.assign({}, userRelation));
        } catch (error) {
            console.log('return from acceptUserRequest service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getFollowersByUserId(userId: string): Promise<any> {
        console.log('getFollowersByUserId service input userId', userId);
        try {
            let followers = await this.userRelationDao.getFollowersByUserId(userId);
            console.log('return value from getFollowersByUserId method', followers);
            if(!followers){
                console.log('return from getFollowersByUserId service', followers);
                return [];
            }
            console.log('return from getFollowersByUserId service', Object.assign([], followers));
            return Response.success(Object.assign([], followers));
        } catch (error) {
            console.log('return from getFollowersByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getFollowingUsersByUserId(userId: string): Promise<any> {
        console.log('getFollowingUsersByUserId service input userId', userId);
        try {
            let followingUsers = await this.userRelationDao.getFollowingUsersByUserId(userId);
            console.log('return value from getFollowingUsersByUserId method', followingUsers);
            if(!followingUsers){
                console.log('return from getFollowingUsersByUserId service', followingUsers);
                return [];
            }
            console.log('return from getFollowingUsersByUserId service', Object.assign([], followingUsers));
            return Response.success(Object.assign([], followingUsers));
        } catch (error) {
            console.log('return from getFollowingUsersByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getRequestersByUserId(userId: string): Promise<any> {
        console.log('getRequestersByUserId service input userId', userId);
        try {
            let requesters = await this.userRelationDao.getRequestersByUserId(userId);
            console.log('return value from getRequestersByUserId method', requesters);
            if(!requesters){
                console.log('return from getRequestersByUserId service', requesters);
                return [];
            }
            console.log('return from getRequestersByUserId service', Object.assign([], requesters));
            return Response.success(Object.assign([], requesters));
        } catch (error) {
            console.log('return from getRequestersByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async deleteUserRelationByIds(data: UserRelationIds): Promise<any> {
        console.log('deleteUserRelationById service input data', data);
        try {
            let existingRelation = await this.userRelationDao.getUserRelationByIds(data);
            console.log('return val from getUserRelationByIds method', existingRelation);
            if (!existingRelation && !existingRelation._id) {
                console.log('return deleteUserRelationById service', existingRelation);
                return Response.fileNotFound();
            }
            const deletedRelation = await this.userRelationDao.deleteUserRelationById(existingRelation._id);
            console.log('return from deleteUserRelationById service', deletedRelation);
            return Response.success(deletedRelation);
        } catch (error) {
            console.log('return from deleteUserRelationById service', error);
            return Response.badRequest(error.message);
        }
    }

    public async deleteAllUserRelationByUserId(userId: string): Promise<any> {
        console.log('deleteAllUserRelationByUserId service input userId', userId);
        try {
            let existingUser = await this.userDao.getUserByUserId(userId);
            console.log('return val from getUserByUserId method: existingUser: ', existingUser);
            if (!existingUser?._id) {
                console.log('return deleteAllUserRelationByUserId service', existingUser);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const deletedRelations = await this.userRelationDao.deleteAllUserRelationByUserId(existingUser._id);
            console.log('return from deleteAllUserRelationByUserId service', deletedRelations);
            return Response.success(RESPONSE_MEESAGE['USER_RELATION_DELETED_SUCCESSFULLY']);
        } catch (error) {
            console.log('error from deleteAllUserRelationByUserId service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_DELETE_USER_RELATION']);
        }
    }
}