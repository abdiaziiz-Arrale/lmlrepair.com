import { PrismaClient } from '@prisma/client';

import {
   ItemsCategory,
   ItemsSubCategory,
   Vendor,
   Location,
   InventoryItem,
   Variation,
   StockReturn,
   InternalTransfer,
   Sale,
   InventoryAge,
   LowStockAlert,
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

   await prisma.stockReturn.createMany({
      data: StockReturn,
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
