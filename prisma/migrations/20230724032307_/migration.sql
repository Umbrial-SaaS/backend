-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_sellerId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductAdditionalDetails` DROP FOREIGN KEY `ProductAdditionalDetails_productId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductCustomField` DROP FOREIGN KEY `ProductCustomField_productId_fkey`;

-- DropForeignKey
ALTER TABLE `UserRole` DROP FOREIGN KEY `UserRole_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `Seller`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCustomField` ADD CONSTRAINT `ProductCustomField_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAdditionalDetails` ADD CONSTRAINT `ProductAdditionalDetails_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
