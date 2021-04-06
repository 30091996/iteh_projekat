import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entity/Product";
import { GenericController } from "./GenericController";
import * as path from 'path';
import * as multer from 'multer';
import * as fs from 'fs'

const upload = multer({ dest: path.resolve('img/') })

export class ProductController implements GenericController {



    async all(request: Request, response: Response) {
        const productRepository = getRepository(Product);
        const products = await productRepository.find();


        const res = products.map(element => {

            const img = fs.readFileSync(path.resolve('img/' + element.picture), 'base64');
            return {
                ...element, picture: img
            }

        });
        response.json(res);

    }
    async create(request: Request, response: Response) {

        const tempPath = request.file.path;
        const targetPath = path.resolve('img/' + request.file.originalname);

        const productRepository = getRepository(Product);
        const data = request.body;
        data.picture = request.file.originalname;
        data.price = parseFloat(request.body.price);
        data.productCategory = parseInt(request.body.productCategory);
        fs.rename(tempPath, targetPath, err => {

        })
        console.log(data);
        const insertRes = await productRepository.insert({
            name: data.name,
            price: data.price,
            description: data.description,
            productCategory: {
                id: data.productCategory
            },
            picture: data.picture
        });
        const created = await productRepository.findOne(insertRes.identifiers[0].id);
        created.picture = fs.readFileSync(path.resolve('img/' + created.picture), 'base64');
        response.json(created);
    }

    async update(request: Request, response: Response) {
        const productRepository = getRepository(Product);
        const id = request.params.id;
        const data = request.body as Partial<Product>;
        if (!id) {
            response.sendStatus(400);
            return;
        }
        const existing = await productRepository.findOne(id)
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