import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ProductCategory } from "../entity/ProductCategory";
import { GenericController } from "./GenericController";


export class ProductCategoryController implements GenericController {





    async all(request: Request, response: Response) {

        const categories = await getRepository(ProductCategory).find();
        response.json(categories);
    }

}

const controller = new ProductCategoryController();

export default controller;