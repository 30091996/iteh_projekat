import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedUsernameToUserAndExecutedColumnToCart1617194626270 implements MigrationInterface {
    name = 'AddedUsernameToUserAndExecutedColumnToCart1617194626270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `username` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `cart` ADD `executed` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_618194d24a7ea86a165d7ec628e`");
        await queryRunner.query("ALTER TABLE `product` CHANGE `productCategoryId` `productCategoryId` int NULL");
        await queryRunner.query("ALTER TABLE `cart` DROP FOREIGN KEY `FK_756f53ab9466eb52a52619ee019`");
        await queryRunner.query("ALTER TABLE `cart` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_618194d24a7ea86a165d7ec628e` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cart` ADD CONSTRAINT `FK_756f53ab9466eb52a52619ee019` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cart` DROP FOREIGN KEY `FK_756f53ab9466eb52a52619ee019`");
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_618194d24a7ea86a165d7ec628e`");
        await queryRunner.query("ALTER TABLE `cart` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `cart` ADD CONSTRAINT `FK_756f53ab9466eb52a52619ee019` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product` CHANGE `productCategoryId` `productCategoryId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_618194d24a7ea86a165d7ec628e` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cart` DROP COLUMN `executed`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `username`");
    }

}
