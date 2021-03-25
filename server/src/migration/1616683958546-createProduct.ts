import {MigrationInterface, QueryRunner} from "typeorm";

export class createProduct1616683958546 implements MigrationInterface {
    name = 'createProduct1616683958546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `product_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `picture` varchar(255) NOT NULL, `price` int NOT NULL, `productCategoryId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_618194d24a7ea86a165d7ec628e` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_618194d24a7ea86a165d7ec628e`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP TABLE `product_category`");
    }

}
