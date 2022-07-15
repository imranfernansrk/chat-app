import { Application } from "express";
import { PersonalInfoController } from '../Controllers'
import { Auth } from "../Auth/Authentication";

class PersonalInfoRoutes {
    private personalInfoController: PersonalInfoController;
    private auth: Auth;
    constructor() { 
        this.personalInfoController = new PersonalInfoController();
        this.auth = new Auth();
    }

    public initialRoutes(application: Application) {
        application.route('/personal-info').post(this.auth.checkValidUser, this.personalInfoController.createPersonalInfo);
        application.route('/personal-info/:id').get(this.auth.checkValidUser, this.personalInfoController.getPersonalInfoByUserId);
        application.route('/personal-info/:id').put(this.auth.checkValidUser, this.personalInfoController.updatePersonalInfoByUserId);
    }
}

export default PersonalInfoRoutes;