import { PrismaClient } from '@prisma/client';

import {
   brands,
   categories,
   model,
   modelCategory,
   series,
   services,
} from './seededitems';

const prisma = new PrismaClient();

async function main() {
   await prisma.service.createMany({
      data: services,
   });

   await prisma.brand.createMany({
      data: brands,
   });

   await prisma.category.createMany({
      data: categories,
   });

   await prisma.series.createMany({
      data: series,
   });

   await prisma.model.createMany({
      data: model,
   });

   await prisma.modelCategory.createMany({
      data: modelCategory,
   });
}

main()
   .catch((error) => {
      console.log(error);
      process.exit(1);
   })
   .finally(() => {
      prisma.$disconnect();
   });
