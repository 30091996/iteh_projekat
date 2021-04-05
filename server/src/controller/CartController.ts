import { GenericController } from "./GenericController";
import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import Cart from "../entity/Cart";
import { User } from "../entity/User";
import Order from "../entity/Order";

export class CartController implements GenericController {

    async all(request: Request, response: Response): Promise<any> {

        const carts = await getRepository(Cart).find();

        const res = await Promise.all(carts.map(async element => {
            const items = await getRepository(Order).find({
                where: {
                    cart: {
                        id: element.id
                    }
                }
            });
            return {
                ...element, items: items.map(item => {
                    return {
                        product: item.product,
                        ammount: item.ammount
                    }
                })
            }
        }));
        response.json(res);
    }
    async create?(request: Request, response: Response): Promise<any> {

        const user = (request.session as any).user as User | undefined;
        if (!user) {
            response.sendStatus(403);
            return;
        }
        const cart = request.body as Partial<Cart>;
        cart.user = user;
        getManager().transaction(async (manager) => {
            const createdCart = await manager.save(Cart, { adress: cart.adress, executed: false, phone: cart.phone, user: user });
            const prepared = cart.items.map(element => {
                return { ...element, cart: createdCart };
            });
            await manager.save(Order, prepared);
            response.sendStatus(200);
        })
    }
}
const controller = new CartController();
export default controller;