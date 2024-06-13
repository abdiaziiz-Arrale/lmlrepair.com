'use server';

import prisma from '@/lib/prisma';
import { InternalTransfer } from '@prisma/client';

export const getInternalTransfers = async (): Promise<InternalTransfer[]> => {
   try {
      return await prisma.internalTransfer.findMany({
         include: {
            fromLocation: true,
            toLocation: true,
            inventoryItem: {
               include: {
                  variations: true,
               },
            },
         },
      });
   } catch (error) {
      console.error('Error fetching internal transfers:', error);
      throw new Error('Failed to fetch internal transfers');
   }
};

export const getInternalTransferById = async (
   internalTransferId: string
): Promise<InternalTransfer | null> => {
   try {
      const transfer = await prisma.internalTransfer.findUnique({
         where: {
            internalTransferId: parseInt(internalTransferId),
         },
         include: {
            fromLocation: true,
            toLocation: true,
            inventoryItem: {
               include: {
                  variations: true,
               },
            },
         },
      });

      return transfer; // Return single InternalTransfer or null if not found
   } catch (error) {
      console.error('Error fetching internal transfer by ID:', error);
      throw new Error('Failed to fetch internal transfer by ID');
   }
};

type CreateInternalTransferInput = {
   inventoryItemId: string;
   quantity: string;
   status: string;
   fromLocationId: string;
   toLocationId: string;
};

type createInternalResponse = {
   message: string;
   status: string;
};

export const createInternalTransfer = async (
   data: CreateInternalTransferInput
): Promise<createInternalResponse> => {
   try {
      const {
         inventoryItemId,
         quantity,
         fromLocationId,
         toLocationId,
         status,
      } = data;

      await prisma.internalTransfer.create({
         data: {
            inventoryItemId: parseInt(inventoryItemId),
            status: status,
            quantity: parseInt(quantity),
            fromLocationId: parseInt(fromLocationId),
            toLocationId: parseInt(toLocationId),
         },
      });
      return { message: 'Internal Transfer Created', status: 'success' };
   } catch (error) {
      console.error('Error creating internal transfer:', error);
      throw new Error('Failed to create internal transfer');
   }
};
