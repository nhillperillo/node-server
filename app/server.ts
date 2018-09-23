import bodyParser from "body-parser";
import express,  { NextFunction, Request, Response } from "express";
import http from "http";
import path from "path";
import Routes from "./router";
import { Config } from "./config";
import { connect, Mongoose } from "mongoose";


class Server {
  public serverApp: express.Application;
  private appRouter: Routes;

  constructor() {
    this.serverApp = express();
    this.appRouter = new Routes(this.serverApp);
  } 

  public config(serverApp: express.Application){
    serverApp.use(bodyParser.json({ limit: "50mb" }));
    serverApp.use(
      bodyParser.urlencoded({
        extended: true,
        limit: "50mb",
        parameterLimit: 100000000
      })
    );

    serverApp.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-Credentials", "true");

      // Intercept OPTIONS Method
      if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Method", "GET,POST,PATCH,DELETE,PUT");
        res.send(200)
      } else {
        next();
      }
    });
  }

    public routes(serverApp: express.Application, routerlink:express.Router){
      serverApp.use(async (req: Request, res: Response, next: NextFunction) =>{
        if (!serverApp.get("mongoConnection")) {
          const conString = Config.MONGO_CON_URL || "http://localhost:3333/";
          const conn = await connect(conString);
          serverApp.set("mongoConnection", conn);
        } 
        next();
    });

    serverApp.use("/api/", routerlink);
  }

}

export default new Server();
