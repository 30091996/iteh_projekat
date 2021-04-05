import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Order from "./Order";
import { User } from "./User";


@Entity()
export default class Cart {


    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(type => User, { eager: true })
    user: User

    @Column()
    executed: boolean

    @Column()
    adress: string

    @Column()
    phone: string

    @OneToMany(type => Order, o => o.cart, { eager: false })
    items: Order[]
}