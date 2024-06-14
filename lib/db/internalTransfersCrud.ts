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

type UpdateInternalTransferInput = {
   inventoryItemId?: string;
   quantity?: number;
   status?: string;
   fromLocationId?: string;
   toLocationId?: string;
};

type updateInternalResponse = {
   message: string;
   status: string;
};

export const updateInternalTransfer = async (
   internalTransferId: number,
   data: UpdateInternalTransferInput
): Promise<updateInternalResponse> => {
   try {
      // Fetch the current transfer item
      const transferItem = await prisma.internalTransfer.findUnique({
         where: {
            internalTransferId: internalTransferId,
         },
      });

      if (!transferItem) {
         return { message: 'Internal Transfer not found', status: 'error' };
      }

      // Determine the new values for the fields to be updated
      const updatedData = {
         inventoryItemId: data.inventoryItemId
            ? parseInt(data.inventoryItemId)
            : transferItem.inventoryItemId,
         quantity:
            data.quantity !== undefined
               ? +data.quantity
               : transferItem.quantity,
         status: data.status ?? transferItem.status,
         fromLocationId: data.fromLocationId
            ? parseInt(data.fromLocationId)
            : transferItem.fromLocationId,
         toLocationId: data.toLocationId
            ? parseInt(data.toLocationId)
            : transferItem.toLocationId,
      };

      // Perform the update
      await prisma.internalTransfer.update({
         where: {
            internalTransferId: internalTransferId,
         },
         data: updatedData,
      });

      return { message: 'Internal Transfer Updated', status: 'success' };
   } catch (error) {
      console.error('Error updating internal transfer:', error);
      throw new Error('Failed to update internal transfer');
   }
};
