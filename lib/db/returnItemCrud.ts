'use server';

import prisma from '@/lib/prisma';
import { ItemReturnExtended } from '@/lib/type';
import { ItemReturn } from '@prisma/client';

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

type dataToSave = {
   inventoryItemId: number;
   locationId: number;
   reason: string;
   returningParty: string;
   returnedAt: Date;
   status: string;
   request: string;
   result: string;
};

export const createReturnedItem = async (
   data: dataToSave
): Promise<ItemReturn> => {
   try {
      return await prisma.itemReturn.create({
         data: {
            inventoryItemId: data.inventoryItemId,
            locationId: data.locationId,
            reason: data.reason,
            returningParty: data.returningParty,
            returnedAt: data.returnedAt,
            status: data.status,
            request: data.request,
            result: data.result,
         },
      });
   } catch (error) {
      throw new Error('Failed to create returned item');
   }
};
