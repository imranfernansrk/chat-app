import { PersonalInfoDao } from "../Dao";
import { PersonalInfo, UpdatePersonalInfo } from "../Utils/Types";
import { Response, RESPONSE_MEESAGE } from "../Utils/Response";

export default class PersonalInfoService {
    private personalDao: PersonalInfoDao;
    constructor() {
        this.personalDao = new PersonalInfoDao();
    }

    public async createPersonalInfo(data: PersonalInfo): Promise<any> {
        console.log('createPersonalInfo service input', data);
        try {
            let personalInfo = await this.personalDao.getPersonalInfoByUserId(data._id);
            console.log('check personalInfo', personalInfo);
            if (personalInfo) {
                console.log('return from createPersonalInfo service', personalInfo);
                return Response.badRequest(RESPONSE_MEESAGE['PERSONAL_INFO_ALREADY_EXISTED']);
            }
            const newInfo = await this.personalDao.createPersonalInfo(data);
            console.log('return from createPersonalInfo service', newInfo);
            return Response.success(newInfo);
        } catch (error) {
            console.log('error from createPersonalInfo service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_CREATE_PERSONAL_INFO']);
        }
    }

    public async getPersonalInfoByUserId(id: string): Promise<any> {
        console.log('getPersonalInfoByUserId service input id', id);
        try {
            let info = await this.personalDao.getPersonalInfoByUserId(id);
            console.log('return val from getPersonalInfoByUserId', info);
            if (!info) {
                console.log('return getPersonalInfoByUserId service', info);
                return Response.notFound(RESPONSE_MEESAGE['PERSONAL_INFO_NOT_FOUND']);
            }
            console.log('return from getPersonalInfoByUserId service', info);
            return Response.success(info);
        } catch (error) {
            console.log('error from getPersonalInfoByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async updatePersonalInfoByUserId(id: string, data: UpdatePersonalInfo): Promise<any> {
        console.log('updatePersonalInfo service input id', id);
        console.log('updatePersonalInfo service input data', data);
        try {
            let info = await this.personalDao.getPersonalInfoByUserId(id);
            console.log('return val from getPersonalInfo', info);
            if (!info) {
                console.log('return updatePersonalInfo service', info);
                return Response.notFound(RESPONSE_MEESAGE['PERSONAL_INFO_NOT_FOUND']);
            }
            const updatedInfo = await this.personalDao.updatePersonalInfoByUserId(id, data);
            console.log('return from updatePersonalInfo service', updatedInfo);
            return Response.success(updatedInfo);
        } catch (error) {
            console.log('return from updatePersonalInfo service', error);
            return Response.badRequest(error.message);
        }
    }

    public async deletePersonalInfoByUserId(id: string): Promise<any> {
        console.log('deletePersonalInfo service input id', id);
        try {
            let info = await this.personalDao.getPersonalInfoByUserId(id);
            console.log('return val from getPersonalInfo', info);
            if (!info) {
                console.log('return deletePersonalInfo service', info);
                return Response.notFound(RESPONSE_MEESAGE['PERSONAL_INFO_NOT_FOUND']);
            }
            const deletedInfo = await this.personalDao.deletePersonalInfoByUserId(id);
            console.log('return from deletePersonalInfo service', deletedInfo);
            return Response.success(RESPONSE_MEESAGE['PERSONAL_INFO_DELETED_SUCCESSFULLY']);
        } catch (error) {
            console.log('error from deletePersonalInfo service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_DELETE_PERSONAL_INFO']);
        }
    }
}