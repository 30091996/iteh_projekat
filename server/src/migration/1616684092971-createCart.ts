import {MigrationInterface, QueryRunner} from "typeorm";

export class createCart1616684092971 implements MigrationInterface {
    name = 'createCart1616684092971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `order` (`ammount` int NOT NULL, `productId` int NOT NULL, `cartId` int NOT NULL, PRIMARY KEY (`productId`, `cartId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cart` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_618194d24a7ea86a165d7ec628e`");
        await queryRunner.query("ALTER TABLE `product` CHANGE `productCategoryId` `productCategoryId` int NULL");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_618194d24a7ea86a165d7ec628e` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_88991860e839c6153a7ec878d39` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_fe3963d525b2ee03ba471953a7c` FOREIGN KEY (`cartId`) REFERENCES `cart`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cart` ADD CONSTRAINT `FK_756f53ab9466eb52a52619ee019` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cart` DROP FOREIGN KEY `FK_756f53ab9466eb52a52619ee019`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_fe3963d525b2ee03ba471953a7c`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_88991860e839c6153a7ec878d39`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_618194d24a7ea86a165d7ec628e`");
        await queryRunner.query("ALTER TABLE `product` CHANGE `productCategoryId` `productCategoryId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_618194d24a7ea86a165d7ec628e` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP TABLE `cart`");
        await queryRunner.query("DROP TABLE `order`");
    }

}
