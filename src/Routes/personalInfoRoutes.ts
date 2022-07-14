import { Application } from "express";
import ProfileInfoController from '../Controllers/profileInfoController'

class PersonalInfoRoutes {
    private personalInfoController: ProfileInfoController
    constructor() { 
        this.personalInfoController = new ProfileInfoController();
    }

    public initialRoutes(application: Application) {
        application.route('/personalInfo').post(this.personalInfoController.createPersonalInfo);
        application.route('/personalInfo/:id').get(this.personalInfoController.getPersonalInfo);
        application.route('/personalInfo/:id').put(this.personalInfoController.updatePersonalInfo);
    }
}

export default PersonalInfoRoutes;