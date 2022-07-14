import { Application } from "express";
import UserRoutes from "./userRoutes";
import PersonalInfoRoutes from "./personalInfoRoutes";
import PostRoutes from "./postRoutes";
import UserRelationRoutes from "./userRelationRoutes";
class Routes {
    private userRoutes: UserRoutes;
    private personalInfoRoutes: PersonalInfoRoutes;
    private postRoutes: PostRoutes;
    private userRelationRoutes: UserRelationRoutes;
    constructor() {
        this.userRoutes = new UserRoutes();
        this.personalInfoRoutes = new PersonalInfoRoutes();
        this.postRoutes = new PostRoutes();
        this.userRelationRoutes = new UserRelationRoutes();
    }

    public initialRoutes(application: Application) {
        this.userRoutes.initialRoutes(application);
        this.personalInfoRoutes.initialRoutes(application);
        this.postRoutes.initialRoutes(application);
        this.userRelationRoutes.initialRoutes(application);
    }
}

export default Routes;