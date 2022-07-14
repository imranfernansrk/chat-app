import { Application } from "express";
import { UserRelationController } from '../Controllers';
import { Auth } from "../Auth/Authentication";

class UserRelationRoutes {
    private userRelationController: UserRelationController;
    private auth: Auth;
    constructor() {
        this.userRelationController = new UserRelationController();
        this.auth = new Auth();
    }

    public initialRoutes(application: Application) {
        application.route('/sendUserRequest').post(this.auth.checkValidUser, this.userRelationController.sendUserRequest);
        application.route('/acceptUserRequest/:id').post(this.auth.checkValidUser, this.userRelationController.acceptUserRequest);
        application.route('/followers/:id').get(this.auth.checkValidUser, this.userRelationController.getFollowersByUserId);
        application.route('/following/:id').get(this.auth.checkValidUser, this.userRelationController.getFollowingUsersByUserId);
        application.route('/requests/:id').get(this.auth.checkValidUser, this.userRelationController.getRequestersByUserId);
        application.route('/deleteUserRelation').delete(this.auth.checkValidUser, this.userRelationController.deleteUserRelationByIds);
        application.route('/deleteAllUserRelation/:id').delete(this.auth.checkValidUser, this.userRelationController.deleteAllUserRelationByUserId);
    }
}

export default UserRelationRoutes;