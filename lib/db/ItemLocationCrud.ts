'use server';

import prisma from '@/lib/prisma';
import { Location } from '@prisma/client';

export const getLocations = async (): Promise<Location[]> => {
   try {
      return await prisma.location.findMany({
         orderBy: { name: 'asc' },
      });
   } catch (error) {
      console.error('Error fetching inventory locatinos:', error);
      throw new Error('Failed to fetch inventory locations');
   }
};
