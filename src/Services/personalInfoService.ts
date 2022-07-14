import { PersonalInfoDao } from "../Dao";
import { PersonalInfo } from "../Utils/Types";
import { Response } from "../Utils/Response";

export default class PersonalInfoService {
    private personalDao: PersonalInfoDao;
    constructor() {
        this.personalDao = new PersonalInfoDao();
    }

    public async createPersonalInfo(data: PersonalInfo): Promise<any> {
        console.log('createPersonalInfo service input', data);
        try {
            let personalInfo = await this.personalDao.getPersonalInfo(data.id);
            console.log('check personalInfo', personalInfo);
            if (!personalInfo && !personalInfo._id) {
                console.log('return from createPersonalInfo service', personalInfo);
                return Response.badRequest('User info is already exists');
            }
            const newInfo = await this.personalDao.createPersonalInfo(data);
            console.log('return from createPersonalInfo service', Object.assign({}, newInfo));
            return Response.success(Object.assign({}, newInfo));
        } catch (error) {
            console.log('return from createPersonalInfo service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getPersonalInfo(id: string): Promise<any> {
        console.log('getPersonalInfo service input id', id);
        try {
            let info = await this.personalDao.getPersonalInfo(id);
            console.log('return val from getPersonalInfo', info);
            if (!info && !info._id) {
                console.log('return updatePersonalInfo service', info);
                return Response.fileNotFound();
            }
            console.log('return from getPersonalInfo service', info);
            return Response.success(info);
        } catch (error) {
            console.log('return from getPersonalInfo service', error);
            return Response.badRequest(error.message);
        }
    }

    public async updatePersonalInfo(id: string, data: PersonalInfo): Promise<any> {
        console.log('updatePersonalInfo service input id', id);
        console.log('updatePersonalInfo service input data', data);
        try {
            let info = await this.personalDao.getPersonalInfo(id);
            console.log('return val from getPersonalInfo', info);
            if (!info && !info._id) {
                console.log('return updatePersonalInfo service', info);
                return Response.fileNotFound();
            }
            const updatedInfo = await this.personalDao.updatePersonalInfo(id, data);
            console.log('return from updatePersonalInfo service', updatedInfo);
            return Response.success(updatedInfo);
        } catch (error) {
            console.log('return from updatePersonalInfo service', error);
            return Response.badRequest(error.message);
        }
    }

    public async deletePersonalInfo(id: string): Promise<any> {
        console.log('deletePersonalInfo service input id', id);
        try {
            let info = await this.personalDao.getPersonalInfo(id);
            console.log('return val from getPersonalInfo', info);
            if (!info && !info._id) {
                console.log('return deletePersonalInfo service', info);
                return Response.fileNotFound();
            }
            const deletedInfo = await this.personalDao.deletePersonalInfo(id);
            console.log('return from deletePersonalInfo service', deletedInfo);
            return Response.success(deletedInfo);
        } catch (error) {
            console.log('return from deletePersonalInfo service', error);
            return Response.badRequest(error.message);
        }
    }
}