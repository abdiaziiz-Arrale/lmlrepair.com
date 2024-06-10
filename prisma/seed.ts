import { PrismaClient } from '@prisma/client';

import {
   Comment,
   InternalTransfer,
   InventoryAge,
   InventoryItem,
   ItemReturn,
   ItemsCategory,
   ItemsSubCategory,
   Location,
   LowStockAlert,
   Sale,
   Variation,
   Vendor,
} from './inventoryItems';

import {
   brands,
   categories,
   model,
   modelCategory,
   series,
   services,
} from './serviceItems';

const prisma = new PrismaClient();

async function main() {
   await prisma.brand.createMany({
      data: brands,
   });

   await prisma.service.createMany({
      data: services,
   });

   await prisma.series.createMany({
      data: series,
   });

   await prisma.modelCategory.createMany({
      data: modelCategory,
   });

   await prisma.model.createMany({
      data: model,
   });

   await prisma.category.createMany({
      data: categories,
   });

   // Delete existing records
   await prisma.lowStockAlert.deleteMany({});
   await prisma.inventoryAge.deleteMany({});
   await prisma.sale.deleteMany({});
   await prisma.internalTransfer.deleteMany({});
   await prisma.itemReturn.deleteMany({});
   await prisma.variation.deleteMany({});
   await prisma.inventoryItem.deleteMany({});
   await prisma.location.deleteMany({});
   await prisma.vendor.deleteMany({});
   await prisma.itemsSubCategory.deleteMany({});
   await prisma.itemsCategory.deleteMany({});
   await prisma.comment.deleteMany({});

   // Insert new records
   await prisma.itemsCategory.createMany({
      data: ItemsCategory,
   });

   await prisma.itemsSubCategory.createMany({
      data: ItemsSubCategory,
   });

   await prisma.vendor.createMany({
      data: Vendor,
   });

   await prisma.location.createMany({
      data: Location,
   });

   await prisma.inventoryItem.createMany({
      data: InventoryItem,
   });

   await prisma.variation.createMany({
      data: Variation,
   });

   await prisma.itemReturn.createMany({
      data: ItemReturn,
   });

   await prisma.comment.createMany({
      data: Comment,
   });

   await prisma.internalTransfer.createMany({
      data: InternalTransfer,
   });

   await prisma.sale.createMany({
      data: Sale,
   });

   await prisma.inventoryAge.createMany({
      data: InventoryAge,
   });

   await prisma.lowStockAlert.createMany({
      data: LowStockAlert,
   });
}

main()
   .catch((error) => {
      console.error(error);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
