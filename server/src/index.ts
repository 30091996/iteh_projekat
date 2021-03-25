import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import * as cors from 'cors'

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(cors())
    app.use(express.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        app[route.method](route.route, (req: Request, res: Response) => {
            route.controller[route.action](req, res);
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(4000);



    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
