import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { GenericController } from "./GenericController";

export class UserController implements GenericController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}
const controller = new UserController();
export default controller;