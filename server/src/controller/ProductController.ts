import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entity/Product";
import { GenericController } from "./GenericController";


export class ProductController implements GenericController {

    private productRepository = getRepository(Product);

    async all(request: Request, response: Response) {

        const products = await this.productRepository.find();
        response.json(products);
    }
    async create(request: Request, response: Response) {
        const data = request.body as Partial<Product>;
        const insertRes = await this.productRepository.insert(data);
        const created = await this.productRepository.findOne(insertRes.identifiers[0].id);
        response.json(created);
    }
    async remove(request: Request, response: Response) {
        const id = request.params.id;
        if (!id) {
            response.sendStatus(400);
            return;
        }
        await this.productRepository.delete(id);
        response.sendStatus(204)

    }
    async update(request: Request, response: Response) {
        const id = request.params.id;
        const data = request.body as Partial<Product>;
        if (!id) {
            response.sendStatus(400);
            return;
        }
        const existing = await this.productRepository.findOne(id);
        if (!existing) {
            response.sendStatus(404);
            return;
        }
        this.productRepository.update(id, { ...data });
        response.json(await this.productRepository.findOne(id));


    }
}

const controller = new ProductController();

export default controller;