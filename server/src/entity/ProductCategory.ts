import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class ProductCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;





}
