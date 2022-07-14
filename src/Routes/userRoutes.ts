import { Application } from "express";
import UserController from '../Controllers/userController'

class UserRoutes {
    private userController: UserController
    constructor() { 
        this.userController = new UserController();
    }

    public initialRoutes(application: Application) {
        application.route('/user').get((req, res) => res.send('Hello user imran!'));
        application.route('/createUser').post(this.userController.createUser);
        application.route('/signin').post(this.userController.signin);
        application.route('/updatePassword/:id').put(this.userController.updatePassword);
        application.route('/deleteUser/:id').delete(this.userController.deleteUser);
    }
}

export default UserRoutes;