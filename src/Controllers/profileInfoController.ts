import { Request, Response } from 'express';
import PersonalInfoService from '../Services/personalInfoService';
import { PersonalInfo } from '../Utils/Types'

const personalInfoService = new PersonalInfoService();

export default class ProfileInfoController {
    public async createPersonalInfo(req: Request, res: Response): Promise<void> {
        const body: PersonalInfo = req.body
        const result = await personalInfoService.createPersonalInfo(body);
        res.status(result.statusCode).json(result);
    }
    public async getPersonalInfo(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const result = await personalInfoService.getPersonalInfo(id);
        res.status(result.statusCode).json(result);
    }
    public async updatePersonalInfo(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const body: PersonalInfo = req.body
        let result = await personalInfoService.updatePersonalInfo(id, body);
        res.status(result.statusCode).json(result);
    }
    public async deletePersonalInfo(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        let result = await personalInfoService.deletePersonalInfo(id);
        res.status(result.statusCode).json(result);
    }
}