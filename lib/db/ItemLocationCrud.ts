'use server';

import prisma from '@/lib/prisma';
import { Location } from '@prisma/client';
import { PartialBy } from '../type';

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

type CreateLocationResponse = {
   location: Location;
   status: string;
};

//Todo: Function to create a new location
export const createLocation = async (data: {
   name: string;
   description: string;
}): Promise<CreateLocationResponse> => {
   const { name, description } = data;

   try {
      //Todo: Create the location using Prisma
      const createdLocation = await prisma.location.create({
         data: {
            name,
            description,
         },
      });

      return { status: 'success', location: createdLocation };
      //Todo: Return the created location
   } catch (error) {
      console.error('Error creating inventory location:', error);
      throw new Error('Failed to create inventory location');
   }
};
