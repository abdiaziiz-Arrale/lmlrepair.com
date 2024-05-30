'use server';

import prisma from '@/lib/prisma';
import { ItemsCategory } from '@prisma/client';

export const getCategory = async (): Promise<ItemsCategory[]> => {
   try {
      return await prisma.itemsCategory.findMany({
         orderBy: { name: 'asc' },
         include: {
            subCategories: true,
         },
      });
   } catch (error) {
      console.error('Error fetching inventory categories:', error);
      throw new Error('Failed to fetch inventory categories');
   }
};
