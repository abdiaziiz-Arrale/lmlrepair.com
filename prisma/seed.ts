import { PrismaClient } from '@prisma/client';
import { posts, users } from './blogDummyData';

const prisma = new PrismaClient();

async function main() {
   await prisma.user.createMany({
      data: users,
   });

   await prisma.post.createMany({
      data: posts,
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
