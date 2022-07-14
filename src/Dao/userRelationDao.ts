// @ts-check

import UserRelationModel from "../Models/UsersRelation";
import { RelationType, UserRelation, UserRelationIds } from '../Utils/Types'

export class UserRelationDao {
    public async createUserRelation(input: UserRelation): Promise<any> {
        console.log('createUserRelation dao input input', input);
        try {
            const newUserRelation = new UserRelationModel({
                userId: input.userId,
                followerId: input.followerId,
                type: input.type,
            });
            const data = await newUserRelation.save();
            console.log('createUserRelation dao successfully', data);
            return data;
        } catch (error) {
            console.log('Error in createUserRelation dao', error);
            return error.message;
        }
    }
    public async getUserRelationById(id: string): Promise<any> {
        console.log('getUserRelationById dao input id', id);
        try {
            const relationData = await UserRelationModel.findById(id);
            console.log('return of getUserRelationById dao', relationData);
            return relationData;
        } catch (error) {
            console.log('Error in getUserRelationById dao', error);
            return error.message;
        }
    }
    public async getUserRelationByIds(data: UserRelationIds): Promise<any> {
        console.log('getUserRelationByIds dao input data', data);
        try {
            const relationData = await UserRelationModel.findOne(data);
            console.log('return of getUserRelationByIds dao', relationData);
            return relationData;
        } catch (error) {
            console.log('Error in getUserRelationByIds dao', error);
            return error.message;
        }
    }
    public async getFollowersByUserId(userId: string): Promise<any> {
        console.log('getRelationsByUserId dao input id', userId);
        try {
            const input = {
                userId,
                type: 'Followed'
            }
            const followers = await UserRelationModel.find(input);
            console.log('return of getRelationsByUserId dao', followers);
            return followers;
        } catch (error) {
            console.log('Error in getRelationsByUserId dao', error);
            return error.message;
        }
    }
    public async getRequestersByUserId(userId: string): Promise<any> {
        console.log('getRequestersByUserId dao input id', userId);
        try {
            const input = {
                userId,
                type: 'Requested'
            }
            const requesters = await UserRelationModel.find(input);
            console.log('return of getRequestersByUserId dao', requesters);
            return requesters;
        } catch (error) {
            console.log('Error in getRequestersByUserId dao', error);
            return error.message;
        }
    }

    public async getFollowingUsersByUserId(userId: string): Promise<any> {
        console.log('getFollowingUsersByUserId dao input id', userId);
        try {
            const input = {
                followerId: userId,
                type: 'Followed'
            }
            const followingUsers = await UserRelationModel.find(input);
            console.log('return of getFollowingUsersByUserId dao', followingUsers);
            return followingUsers;
        } catch (error) {
            console.log('Error in getFollowingUsersByUserId dao', error);
            return error.message;
        }
    }
    public async updateUserRelationTypeById(id: string, type: RelationType): Promise<any> {
        console.log('updateUserRelationTypeById dao input id', id);
        console.log('updateUserRelationTypeById dao input type', type);
        try {
            const updatedUserRelation = await UserRelationModel.findByIdAndUpdate(id, { type });
            console.log('Return from findByIdAndUpdate', updatedUserRelation);
            return updatedUserRelation;
        } catch (error) {
            console.log('Error in updateUserRelationTypeById dao', error);
            return error.message;
        }
    }
    public async deleteUserRelationById(id: string): Promise<any> {
        console.log('deleteUserRelationById dao input id', id);
        try {
            const deletedUserRelation = await UserRelationModel.findByIdAndDelete(id);
            console.log('Return from findByIdAndDelete', deletedUserRelation);
            return deletedUserRelation;
        } catch (error) {
            console.log('Error in deleteUserRelationById dao', error);
            return error.message;
        }
    }
    public async deleteAllUserRelationByUserId(userId: string): Promise<any> {
        console.log('deleteUserRelationById dao input userId', userId);
        try {
            const deletedfollowers = await UserRelationModel.deleteMany({userId: userId});
            console.log('Return value of deleteMany: deletedfollowers: ', deletedfollowers);
            const deletedfollowing = await UserRelationModel.deleteMany({followerId: userId});
            console.log('Return value of deleteMany: deletedfollowing: ', deletedfollowing);
            const deletedRelations = Object.assign(deletedfollowers, deletedfollowing);
            console.log('Return from deleteUserRelationById', deletedRelations);
            return deletedRelations;
        } catch (error) {
            console.log('Error in deleteUserRelationById dao', error);
            return error.message;
        }
    }
}