import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProductCategory } from "./ProductCategory";
@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    picture: string;

    @Column()
    price: number;

    @ManyToOne(type => ProductCategory, { eager: true })
    productCategory: ProductCategory


}
