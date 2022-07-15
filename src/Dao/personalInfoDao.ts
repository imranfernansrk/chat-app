import { PersonalInfoModel } from "../Models";
import { PersonalInfo, UpdatePersonalInfo } from '../Utils/Types'

export class PersonalInfoDao {
    public async createPersonalInfo(data: PersonalInfo): Promise<any> {
        console.log('createPersonalInfo dao input data', data);
        try {
            const newPersonalInfo = new PersonalInfoModel({
                _id: data._id,
                fullName: data.fullName,
                dob: data.dob,
                gender: data.gender,
                status: data.status
            });
            const newInfo = await newPersonalInfo.save();
            console.log('createPersonalInfo dao successfully', newInfo);
            return newInfo.toObject();
        } catch (error) {
            console.log('Error in createPersonalInfo dao', error);
            return error.message;
        }
    }
    public async getPersonalInfoByUserId(id: string) {
        console.log('getPersonalInfo dao input id', id);
        try {
            const info = await PersonalInfoModel.findById(id);
            console.log('return from findById dao', info);
            return info && info.toObject();
        } catch (error) {
            console.log('Error in getPersonalInfo dao', error);
            return error.message;        
        }
    }
    public async updatePersonalInfoByUserId(id: string, data: UpdatePersonalInfo): Promise<any> {
        console.log('updatePersonalInfo dao input id', id);
        console.log('updatePersonalInfo dao input data', data);
        try {
            await PersonalInfoModel.findByIdAndUpdate(id, data);
            const updatedInfo = await PersonalInfoModel.findById(id);
            console.log('Return from findByIdAndUpdate', updatedInfo);
            return updatedInfo && updatedInfo.toObject();
        } catch (error) {
            console.log('Error in updatePersonalInfo dao', error);
            return error.message          
        }
    }
    public async deletePersonalInfoByUserId(id: string): Promise<any> {
        console.log('deleteUser dao input id', id);
        try {
            const deletedInfo = await PersonalInfoModel.findByIdAndDelete(id);
            console.log('Return from deleteOne', deletedInfo);
            return deletedInfo && deletedInfo.toObject();
        } catch (error) {
            console.log('Error in deleteUser dao', error);
            return error.message;
        }
    }
}