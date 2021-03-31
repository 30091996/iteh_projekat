import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ProductCategory } from "../entity/ProductCategory";
import { GenericController } from "./GenericController";


export class ProductCategoryController implements GenericController {


    private productCategoryRepository = getRepository(ProductCategory);


    async all(request: Request, response: Response) {

        const categories = await this.productCategoryRepository.find();
        response.json(categories);
    }

}

const controller = new ProductCategoryController();

export default controller;