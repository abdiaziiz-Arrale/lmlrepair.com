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

  await prisma.staff.create({
    data: {
      staff_id: 1,
      staff_name: "Allem",
      mobile_number: "634688444",
      email: "abdelaziz.allem@gmail.com",
      location: "hargeisa",
      role: "admin",
      password: "$2a$10$a.jPOyvDMEMw9/.jjo023.Wf794yqp9LJECZfWUSqoEP6S2HMtYSG",
    },
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
