import { Request, Response } from "express";

export interface GenericController {

    all(request: Request, response: Response): Promise<any>;
    one?(request: Request, response: Response): Promise<any>;
    create?(request: Request, response: Response): Promise<any>;
    remove?(request: Request, response: Response): Promise<any>;
    update?(request: Request, response: Response): Promise<any>;

}