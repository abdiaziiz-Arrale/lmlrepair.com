'use server';

import prisma from '@/lib/prisma';
import { InventoryItem } from '@prisma/client';

export const getInventoryItems = async (): Promise<InventoryItem[]> => {
   try {
      return await prisma.inventoryItem.findMany({
         include: {
            variations: true,
            itemsCategory: true,
            itemsSubCategory: true,
            vendor: true,
            location: true,
         },
         orderBy: { inventoryItemId: 'asc' },
      });
   } catch (error) {
      console.error('Error fetching inventory items:', error);
      throw new Error('Failed to fetch inventory items');
   }
};

type CreateItemInput = {
   name: string;
   description: string;
   // brand: string;
   sku: string;
   variations: string;
   vendor: string;
   stock: number;
   rawCost: number;
   taxRate: number;
   shippingCost: number;
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
      // brand,
      vendor,
      stock,
      rawCost,
      taxRate,
      shippingCost,
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
               // brand,
               stock: Number(stock),
               rawCost: Number(rawCost),
               taxRate: Number(taxRate),
               shippingCost: Number(shippingCost),
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
               stockQuantity: Number(stock),
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

type UpdateItemInput = {
   name?: string;
   description?: string;
   sku?: string;
   variations: string;
   vendor?: string;
   stock?: string;
   rawCost?: string;
   taxRate?: string;
   shippingCost?: string;
   category?: string;
   subCategory?: string;
   location?: string;
};

type UpdateItemResponse = {
   status: string;
};

export const updateInventoryItem = async (
   itemId: number,
   data: UpdateItemInput
): Promise<UpdateItemResponse> => {
   try {
      const existingItem = await prisma.inventoryItem.findUnique({
         where: { inventoryItemId: itemId },
         include: {
            variations: true,
         },
      });

      if (!existingItem) {
         throw new Error('Item not found');
      }

      const valueToUpdate = {
         name: data.name || existingItem.name,
         description: data.description || existingItem.description,
         sku: data.sku || existingItem.sku,
         stock: data.stock ? Number(data.stock) : existingItem.stock,
         rawCost: data.rawCost ? Number(data.rawCost) : existingItem.rawCost,
         taxRate: data.taxRate ? Number(data.taxRate) : existingItem.taxRate,
         shippingCost: data.shippingCost
            ? Number(data.shippingCost)
            : existingItem.shippingCost,
         itemsCategoryId: data.category
            ? Number(data.category)
            : existingItem.itemsCategoryId,
         itemsSubCategoryId: data.subCategory
            ? Number(data.subCategory)
            : existingItem.itemsSubCategoryId,
         vendorId: data.vendor
            ? (await prisma.vendor.create({ data: { name: data.vendor } }))
                 .vendorId
            : existingItem.vendorId,
         locationId: data.location
            ? Number(data.location)
            : existingItem.locationId,
      };

      if (data.variations) {
         await prisma.variation.update({
            where: { variationId: existingItem.variations[0].variationId },
            data: { sku: data.variations },
         });
      }

      await prisma.inventoryItem.update({
         where: { inventoryItemId: Number(itemId) },
         data: valueToUpdate,
      });

      return { status: 'success' };
   } catch (error) {
      console.error('Error updating inventory item:', error);
      throw new Error('Failed to update inventory item');
   }
};
