import { Column, Entity, ManyToOne } from "typeorm";
import Cart from "./Cart";
import { Product } from "./Product";

@Entity()
export default class Order {


    @Column()
    ammount: number

    @ManyToOne(type => Product, { eager: true, primary: true, onDelete: 'RESTRICT' })
    product: Product;

    @ManyToOne(type => Cart, c => c.items, { eager: true, primary: true, onDelete: 'CASCADE' })
    cart: Cart;


}