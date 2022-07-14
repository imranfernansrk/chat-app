import { Application } from "express";
import { ProfileInfoController } from '../Controllers'
import { Auth } from "../Auth/Authentication";

class PersonalInfoRoutes {
    private personalInfoController: ProfileInfoController;
    private auth: Auth;
    constructor() { 
        this.personalInfoController = new ProfileInfoController();
        this.auth = new Auth();
    }

    public initialRoutes(application: Application) {
        application.route('/personalInfo').post(this.auth.checkValidUser, this.personalInfoController.createPersonalInfo);
        application.route('/personalInfo/:id').get(this.auth.checkValidUser, this.personalInfoController.getPersonalInfo);
        application.route('/personalInfo/:id').put(this.auth.checkValidUser, this.personalInfoController.updatePersonalInfo);
    }
}

export default PersonalInfoRoutes;