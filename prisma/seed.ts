import { PrismaClient } from "@prisma/client";

import {
  brands,
  categories,
  model,
  modelCategory,
  series,
  services,
} from "./serviceItems";

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
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
