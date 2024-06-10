'use server';

import prisma from '@/lib/prisma';
import { ItemReturnExtended } from '@/lib/type';

export const getReturnedItems = async (): Promise<ItemReturnExtended[]> => {
   try {
      return (await prisma.itemReturn.findMany({
         include: {
            inventoryItem: {
               select: {
                  name: true,
                  rawCost: true,
                  taxRate: true,
                  shippingCost: true,
                  stock: true,
                  vendor: {
                     select: {
                        vendorId: true,
                        name: true,
                     },
                  },
               },
            },
            location: true,
            comments: true,
         },
         orderBy: {
            returnedAt: 'desc',
         },
      })) as ItemReturnExtended[];
   } catch (error) {
      throw new Error('Failed to fetch returned items');
   }
};

export const getReturnedItemById = async (
   returnedItemId: string
): Promise<ItemReturnExtended | null> => {
   try {
      const item = await prisma.itemReturn.findUnique({
         where: {
            stockReturnId: parseInt(returnedItemId),
         },
         include: {
            inventoryItem: {
               select: {
                  name: true,
                  rawCost: true,
                  taxRate: true,
                  shippingCost: true,
                  stock: true,
                  vendor: {
                     select: {
                        vendorId: true,
                        name: true,
                     },
                  },
               },
            },
            location: true,
            comments: true,
         },
      });

      return item as ItemReturnExtended | null;
   } catch (error) {
      throw new Error('Failed to fetch returned item');
   }
};
