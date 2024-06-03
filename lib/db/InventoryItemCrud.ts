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
         orderBy: { name: 'asc' },
      });
   } catch (error) {
      console.error('Error fetching inventory items:', error);
      throw new Error('Failed to fetch inventory items');
   }
};

type CreateItemInput = {
   name: string;
   description: string;
   sku: string;
   variations: string;
   vendor: string;
   stock: number;
   cost: number;
   category: string;
   subCategory?: string;
   location?: string;
};

type CreateItemResponse = {
   item: InventoryItem;
   status: string;
};

export const createInventoryItem = async (
   data: CreateItemInput
): Promise<CreateItemResponse> => {
   const {
      name,
      description,
      sku,
      variations,
      vendor,
      stock,
      cost,
      category,
      subCategory,
      location,
   } = data;

   try {
      const createdItem = await prisma.$transaction(async (prisma) => {
         //Todo: Create the vendor
         const vendorRecord = await prisma.vendor.create({
            data: { name: vendor },
         });

         //Todo: Create the inventory item
         const inventoryItem = await prisma.inventoryItem.create({
            data: {
               name,
               description,
               sku,
               stock: Number(stock),
               cost: Number(cost),
               itemsCategoryId: Number(category),
               itemsSubCategoryId: subCategory ? Number(subCategory) : null,
               vendorId: vendorRecord.vendorId,
               locationId: location ? Number(location) : null,
            },
         });

         //Todo: Create the variation
         await prisma.variation.create({
            data: {
               sku: variations,
               inventoryItemId: inventoryItem.inventoryItemId,
            },
         });

         return inventoryItem;
      });

      return { item: createdItem, status: 'success' };
   } catch (error) {
      console.error('Error creating inventory item:', error);
      throw new Error('Failed to create inventory item');
   }
};
