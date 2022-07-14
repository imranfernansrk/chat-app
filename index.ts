import Express, { Application } from 'express';
import { json, urlencoded } from "body-parser";
import Routes from "./src/Routes";
import cors from "cors";
import mongoose from 'mongoose';
require("dotenv").config();


class App {
  public application: Application;
  private routes = new Routes()
  constructor() {
    this.application = Express();
    this.appConfig();
    this.startListen();
    this.routes.initialRoutes(this.application);
    this.mongoSetup();
  }

  private appConfig() {
    this.application.use(json());
    this.application.use(urlencoded({ extended: false }));
    this.application.use(cors({ credentials: true, origin: true, }));
  }

  private startListen() {
    this.application.listen(process.env.PORT, () => {
      return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
    })
  }

  private async mongoSetup() {
    try {
      console.log('Enter into db connect');
      await mongoose.connect(process.env.DATABASE_URL);
      console.log(`database connected`);
    } catch (error) {
      console.log(`error in database connected`, error);
    }
  }
}

export default new App();