import { Application } from "express";
import UserRelationController from '../Controllers/userRelationController'

class UserRelationRoutes {
    private userRelationController: UserRelationController
    constructor() {
        this.userRelationController = new UserRelationController();
    }

    public initialRoutes(application: Application) {
        application.route('/sendUserRequest').post(this.userRelationController.sendUserRequest);
        application.route('/acceptUserRequest/:id').post(this.userRelationController.acceptUserRequest);
        application.route('/followers/:id').get(this.userRelationController.getFollowersByUserId);
        application.route('/following/:id').get(this.userRelationController.getFollowingUsersByUserId);
        application.route('/requests/:id').get(this.userRelationController.getRequestersByUserId);
        application.route('/deleteUserRelation').delete(this.userRelationController.deleteUserRelationByIds);
        application.route('/deleteAllUserRelation/:id').delete(this.userRelationController.deleteAllUserRelationByUserId);
    }
}

export default UserRelationRoutes;