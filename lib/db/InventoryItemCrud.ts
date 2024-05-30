'use server';

import prisma from '@/lib/prisma';
import { InventoryItem } from '@prisma/client';

export const getInventoryItems = async (): Promise<InventoryItem[]> => {
   try {
      return await prisma.inventoryItem.findMany({
         include: {
            itemsCategory: true,
            itemsSubCategory: true,
            vendor: true,
            location: true,
            variations: true,
         },
         orderBy: { name: 'asc' }, // You can customize the ordering as needed
      });
   } catch (error) {
      console.error('Error fetching inventory items:', error);
      throw new Error('Failed to fetch inventory items');
   }
};
