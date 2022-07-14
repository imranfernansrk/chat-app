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
        application.route('/user').get((req, res) => {
            console.log('req : ', req);
            res.send('Success')
        });
        application.route('/createUser').post(this.userController.createUser);
        application.route('/signin').post(this.userController.signin);
        application.route('/updatePassword/:id').put(this.auth.checkValidUser, this.userController.updatePassword);
        application.route('/deleteUser/:id').delete(this.auth.checkValidUser, this.userController.deleteUser);
    }
}

export default UserRoutes;