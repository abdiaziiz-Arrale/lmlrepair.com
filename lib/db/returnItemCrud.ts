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
   returnedItemId: number
): Promise<ItemReturnExtended | null> => {
   try {
      const item = await prisma.itemReturn.findUnique({
         where: {
            stockReturnId: returnedItemId,
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

      console.log(item);
      return item as ItemReturnExtended | null;
   } catch (error) {
      throw new Error('Failed to fetch returned item');
   }
};

type dataToSave = {
   inventoryItemId: string;
   locationId: string;
   reason: string;
   returningParty: string;
   returnedAt?: Date;
   status: string;
   request: string;
   result: string;
   comments?: string[];
};

type createItemReturnResponse = {
   message: string;
   status: string;
};

export const createReturnedItem = async (
   data: dataToSave
): Promise<createItemReturnResponse> => {
   try {
      //Todo: Save the returned item to the database
      const returnedItem = await prisma.itemReturn.create({
         data: {
            inventoryItemId: parseInt(data.inventoryItemId),
            locationId: parseInt(data.locationId),
            reason: data.reason,
            returningParty: data.returningParty,
            returnedAt: data.returnedAt ? data.returnedAt : new Date(),
            status: data.status,
            request: data.request,
            result: data.result,
         },
      });

      //Todo: Add comments to the returned item
      if (data.comments && data.comments.length > 0) {
         await prisma.comment.createMany({
            data: data.comments.map((comment) => ({
               stockReturnId: returnedItem.stockReturnId,
               text: comment,
            })),
         });
      }

      return {
         message: 'Returned item created successfully',
         status: 'success',
      };
   } catch (error: any) {
      throw new Error('Failed to create returned item');
   }
};

type dataToUpdate = {
   inventoryItemId?: string;
   locationId?: string;
   reason?: string;
   returningParty?: string;
   returnedAt?: Date;
   status?: string;
   request?: string;
   result?: string;
   comments?: string[];
};

type updateItemReturnResponse = {
   message: string;
   status: string;
};

export const updateReturnedItem = async (
   stockReturnId: number,
   data: dataToUpdate
): Promise<updateItemReturnResponse> => {
   try {
      const returnedItem = await prisma.itemReturn.findUnique({
         where: {
            stockReturnId,
         },
         include: {
            comments: true,
         },
      });

      if (!returnedItem) {
         throw new Error('Returned item not found');
      }

      const updated = await prisma.itemReturn.update({
         where: {
            stockReturnId,
         },
         data: {
            inventoryItemId: data.inventoryItemId
               ? parseInt(data.inventoryItemId)
               : returnedItem.inventoryItemId,
            locationId: data.locationId
               ? parseInt(data.locationId)
               : returnedItem.locationId,
            reason: data.reason ? data.reason : returnedItem.reason,
            returningParty: data.returningParty
               ? data.returningParty
               : returnedItem.returningParty,
            returnedAt: data.returnedAt
               ? data.returnedAt
               : returnedItem.returnedAt,
            status: data.status ? data.status : returnedItem.status,
            request: data.request ? data.request : returnedItem.request,
            result: data.result ? data.result : returnedItem.result,
         },
      });

      if (data.comments && data.comments.length > 0) {
         await prisma.comment.deleteMany({
            where: {
               commentId: {
                  in: returnedItem.comments.map((comment) => comment.commentId),
               },
            },
         });

         await prisma.comment.createMany({
            data: data.comments.map((comment) => ({
               stockReturnId,
               text: comment,
            })),
         });
      }

      return {
         message: 'Returned item updated successfully',
         status: 'success',
      };
   } catch (error: any) {
      console.log(error);
      throw new Error('Failed to update returned item');
   }
};
