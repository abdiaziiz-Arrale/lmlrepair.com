'use server';

import prisma from '@/lib/prisma';
import { ItemReturn } from '@prisma/client';

export const getInventoryItems = async (): Promise<ItemReturn[]> => {
   try {
      return await prisma.itemReturn.findMany();
   } catch (error) {
      console.error('Error fetching returned items:', error);
      throw new Error('Failed to fetch');
   }
};
