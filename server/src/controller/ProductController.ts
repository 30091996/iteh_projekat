import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entity/Product";
import { GenericController } from "./GenericController";


export class ProductController implements GenericController {



    async all(request: Request, response: Response) {
        const productRepository = getRepository(Product);
        const products = await productRepository.find();
        response.json(products);
    }
    async create(request: Request, response: Response) {
        const productRepository = getRepository(Product);
        const data = request.body as Partial<Product>;
        const insertRes = await productRepository.insert(data);
        const created = await productRepository.findOne(insertRes.identifiers[0].id);
        response.json(created);
    }
    async remove(request: Request, response: Response) {
        const productRepository = getRepository(Product);
        const id = request.params.id;
        if (!id) {
            response.sendStatus(400);
            return;
        }
        await productRepository.delete(id);
        response.sendStatus(204)

    }
    async update(request: Request, response: Response) {
        const productRepository = getRepository(Product);
        const id = request.params.id;
        const data = request.body as Partial<Product>;
        if (!id) {
            response.sendStatus(400);
            return;
        }
        const existing = await productRepository.findOne(id);
        if (!existing) {
            response.sendStatus(404);
            return;
        }
        productRepository.update(id, data);
        response.json(await productRepository.findOne(id));


    }
}

const controller = new ProductController();

export default controller;