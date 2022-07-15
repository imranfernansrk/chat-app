import { Application } from "express";
import { UserController } from '../Controllers'
import { Auth } from "../Auth/Authentication";

class UserRoutes {
    private userController: UserController
    private auth: Auth;
    constructor() { 
        this.userController = new UserController();
        this.auth = new Auth();
    }

    public initialRoutes(application: Application) {
        application.route('/health-user').get((req, res) => {
            console.log('req : ', req);
            res.send('user health check success')
        });
        application.route('/create-user').post(this.userController.createUser);
        application.route('/create-admin-user').post(this.userController.createAdminUser);
        application.route('/sign-in').post(this.userController.signin);
        application.route('/update-password/:id').put(this.auth.checkValidUser, this.userController.updatePassword);
        application.route('/delete-user/:id').delete(this.auth.checkValidUser, this.userController.deleteUser);
    }
}

export default UserRoutes;