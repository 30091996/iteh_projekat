import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { GenericController } from "./GenericController";


export class UserController implements GenericController {



    async check(request: Request, response: Response, next: NextFunction) {
        const user = (request.session as any).user as User | undefined;
        console.log(request.session);
        if (!user) {
            response.sendStatus(400);
            return;

        }
        response.json(user);
    }

    async register(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            where: {
                username: request.body.username
            }
        })
        if (users.length > 0) {
            response.sendStatus(400)
            return;
        }
        const insertResult = await userRepository.insert(request.body);
        const user = await userRepository.findOne(insertResult.identifiers[0].id);
        (request.session as any).user = user;
        request.session.save((err) => {
            console.log(err);
            if (err)
                response.sendStatus(500);
        });

        response.json(user);

    }

    async login(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            where: {
                username: request.body.username,
                password: request.body.password
            }
        });
        if (!user) {
            response.sendStatus(400);
            return;
        }
        (request.session as any).user = user;
        request.session.save((err) => {
            console.log('user');
            console.log((request.session as any).user)
            if (err)
                response.sendStatus(500);
        });

        response.json(user);
    }

    async logout(request: Request, response: Response, next: NextFunction) {
        request.session.destroy((err) => {
            if (err)
                response.sendStatus(500);
        })
        response.sendStatus(204);
    }
    async all(request: Request, response: Response) {
        const userRepository = getRepository(User);
        const user = (request.session as any).user as User | undefined;
        console.log(user);
        if (!user) {
            response.sendStatus(400);
            return;

        }
        response.json(await userRepository.find());
    }

}
const controller = new UserController();
export default controller;