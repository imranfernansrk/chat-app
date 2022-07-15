import { UserDao, UserRelationDao, PersonalInfoDao, PostDao } from "../Dao";
import { User, UserRoles } from "../Utils/Types";
import { Response, RESPONSE_MEESAGE } from "../Utils/Response";
import { checkPassword, hashPassword } from '../Utils/generateHasPassword';
import jwt from 'jsonwebtoken'

export default class UserService {
    private userDao: UserDao;
    private personalInfoDao: PersonalInfoDao;
    private userRelationDao: UserRelationDao;
    private postDao: PostDao;
    constructor() {
        this.userDao = new UserDao();
        this.personalInfoDao = new PersonalInfoDao();
        this.postDao = new PostDao();
        this.userRelationDao = new UserRelationDao();
    }

    public async createAdminUser(data: User): Promise<any> {
        console.log('createAdminUser service input', data);
        try {
            let existingUser = await this.userDao.getUserByUsername(data.username);
            console.log('check existingUser', existingUser);
            if (existingUser && existingUser._id) {
                console.log('return from createAdminUser service', existingUser);
                return Response.badRequest(RESPONSE_MEESAGE['USER_ALREADY_EXISTED']);
            }
            const hashedPassword = await hashPassword(data.password);
            const role = UserRoles.admin;
            const newAdmin = await this.userDao.createUser({
                ...data,
                password: hashedPassword,
                role: role,
            });
            console.log('return of createAdminUser method', newAdmin);
            const token = jwt.sign({
                expiresIn: "3h",
                userId: newAdmin._id,
                role: newAdmin.role,
            }, process.env.ACCESS_TOKEN_SECRET_KEY);
            console.log('createAdminUser token', token);
            console.log('return from createAdminUser service', { ...newAdmin, token });
            return Response.success({ ...newAdmin, token });
        } catch (error) {
            console.log('return from createUser service', error);
            return Response.badRequest(error.message);
        }
    }

    public async createUser(data: User): Promise<any> {
        console.log('createUser service input', data);
        try {
            let existingUser = await this.userDao.getUserByUsername(data.username);
            console.log('check existingUser', existingUser);
            if (existingUser && existingUser._id) {
                console.log('return from createUser service', existingUser);
                return Response.badRequest(RESPONSE_MEESAGE['USER_ALREADY_EXISTED']);
            }
            const hashedPassword = await hashPassword(data.password);
            const role = UserRoles.user;
            const newUser = await this.userDao.createUser({
                ...data,
                password: hashedPassword,
                role: role,
            });
            console.log('return of createUser method', newUser);
            const token = jwt.sign({
                expiresIn: "3h",
                userId: newUser._id,
                role: newUser.role,
            }, process.env.ACCESS_TOKEN_SECRET_KEY);
            console.log('createUser token', token);
            console.log('return from createUser service', { ...newUser, token });
            return Response.success({ ...newUser, token });
        } catch (error) {
            console.log('return from createUser service', error);
            return Response.badRequest(error.message);
        }
    }

    public async signin(username: string, password: string): Promise<any> {
        console.log('signin service input: username: ', username);
        console.log('signin service input: password: ', password);
        try {
            let user = await this.userDao.getUserByUsername(username);
            console.log('return value from getUserByUsername method: user: ', user);
            if (!user) {
                console.log('return from signin service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            if (!await checkPassword(password, user.password)) {
                console.log('return from signin service: Password Incorrect');
                return Response.badRequest(RESPONSE_MEESAGE['PASSWORD_INCORRECT']);
            }
            //validation of password work is finished. so deleted it from user object
            delete user.password;
            const token = jwt.sign({
                expiresIn: "3h",
                user: user._id,
                role: user.role
            }, process.env.ACCESS_TOKEN_SECRET_KEY);
            console.log("checking token", token);
            console.log('return from signin service', { ...user, token });
            return Response.success({ ...user, token });
        } catch (error) {
            console.log('return from signin service', error);
            return Response.badRequest(error.message);
        }
    }

    public async updateUserPassword(id: string, newPassword: string): Promise<any> {
        console.log('updateUserPassword service input id', id);
        console.log('updateUserPassword service input newPassword', newPassword);
        try {
            const user = await this.userDao.getUserByUserId(id);
            console.log('return of getUser method', user);
            if (!user) {
                console.log('return from updateUserPassword service', user);
                return Response.userNotFound();
            }
            const hashedPassword = await hashPassword(newPassword);
            const updatedUser = await this.userDao.updateUserPassword(id, { password: hashedPassword });
            console.log('return from updateUserPassword service', updatedUser);
            return Response.success(updatedUser);
        } catch (error) {
            console.log('return from updateUserPassword service', error);
            return Response.badRequest('Update password failed');
        }
    }

    public async deleteUserRelatedAllDataByUserId(id: string): Promise<string> {
        console.log('deleteUserRelatedAllDataByUserId service input: id: ', id);
        try {
            //delete user's personal info in the db
            console.log('personal info going to delete id', id);
            const deletedInfo = await this.personalInfoDao.deletePersonalInfoByUserId(id);
            console.log('return of deletePersonalInfo method', deletedInfo);
            //delete user's relationships in the db
            console.log('user relation going to delete id', id);
            const deletedRelation = await this.userRelationDao.deleteAllUserRelationByUserId(id);
            console.log('return of deleteAllUserRelationByUserId method', deletedRelation);
            //delete user's relationships in the db
            console.log('user pots going to delete id', id);
            const deletedPost = await this.postDao.deleteAllPostsByUserId(id);
            console.log('return of deleteAllPostsByUserId method', deletedPost);
            console.log('finish deleteUserRelatedAllDataByUserId service', id);
            return id;
        } catch (error) {
            console.log('error deleteUserRelatedAllDataByUserId service', error);
            return error.message;
        }
    }

    public async deleteUserById(id: string): Promise<any> {
        console.log('deleteUserById service input id', id);
        try {
            const user = await this.userDao.getUserByUserId(id);
            console.log('return of getUser method', user);
            if (!user) {
                console.log('return from deleteUserById service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const deletedId = await this.deleteUserRelatedAllDataByUserId(id);
            console.log('return val of deleteUserRelatedAllDataByUserId method', deletedId);
            const deletedUser = await this.userDao.deleteUserById(id);
            console.log('return from deleteUserById service', deletedUser);
            return Response.success(RESPONSE_MEESAGE['USER_DELETED_SUCCESSFULLY']);
        } catch (error) {
            console.log('return from deleteUserById service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_DELETE_USER']);
        }
    }
}