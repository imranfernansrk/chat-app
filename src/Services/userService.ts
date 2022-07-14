import { UserDao } from "../Dao/userDao";
import { User, UserPassword } from "../Utils/Types";
import { Response } from "../Utils/Response";
import { checkPassword, hashPassword } from '../Utils/generateHasPassword';
import PersonalInfoService from "./personalInfoService";
import jwt from 'jsonwebtoken'

export default class UserService {
    private userDao: UserDao;
    private personalInfoService: PersonalInfoService;
    constructor() {
        this.userDao = new UserDao();
        this.personalInfoService = new PersonalInfoService();
    }

    public async createUser(data: User): Promise<any> {
        console.log('createUser service input', data);
        try {
            let existingUser = await this.userDao.getUserByUsername(data.username);
            console.log('check existingUser', existingUser);
            if (existingUser && existingUser._id) {
                console.log('return from createUser service', existingUser);
                return Response.badRequest('Username already exists');
            }
            const hashedPassword = await hashPassword(data.password);
            const newUser = await this.userDao.createUser({
                ...data,
                password: hashedPassword,
            });
            console.log('return of createUser method', newUser);
            const token = jwt.sign({
                expiresIn: "3h",
                user: newUser._id
            }, process.env.ACCESS_TOKEN_SECRET_KEY);
            console.log('createUser token', token);
            delete newUser.password;
            console.log('return from createUser service', Object.assign(newUser, token));
            return Response.success(Object.assign(newUser, token));
        } catch (error) {
            console.log('return from createUser service', error);
            return Response.badRequest(error);
        }
    }

    public async signin(username: string, password: string): Promise<any> {
        try {
            let user = await this.userDao.getUserByUsername(username);
            console.log('signin Serv', user);
            if (!user) {
                return Response.fileNotFound();
            }
            if (!await checkPassword(password, user.password)) {
                return Response.badRequest('Password Incorrect');
            }
            const token = jwt.sign({
                expiresIn: "3h",
                user: user._id
            }, process.env.ACCESS_TOKEN_SECRET_KEY);
            delete user.password;
            return Response.success(Object.assign(user, token));
        } catch (e) {
            return Response.badRequest('Signin failed');
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
                return Response.fileNotFound();
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

    public async deleteUserById(id: string): Promise<any> {
        console.log('deleteUserById service input id', id);
        try {
            const user = await this.userDao.getUserByUserId(id);
            console.log('return of getUser method', user);
            if (!user) {
                console.log('return from deleteUserById service', user);
                return Response.fileNotFound();
            }
            const deletedUser = await this.userDao.deleteUserById(id);
            if(deletedUser && deletedUser._id){
                console.log('info going to delete id', deletedUser._id);
                const deletedInfo = this.personalInfoService.deletePersonalInfo(deletedUser._id);
                console.log('return of deletePersonalInfo method', deletedInfo);
            }
            console.log('return from deleteUserById service', deletedUser);
            return Response.success(deletedUser);
        } catch (error) {
            console.log('return from deleteUserById service', error);
            return Response.badRequest('Delete user failed');
        }
    }
}