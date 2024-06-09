'use server';

import prisma from '@/lib/prisma';
import { ItemsCategory, ItemsSubCategory } from '@prisma/client';
import { sub } from 'date-fns';

export const getCategoryWithSubCategory = async (): Promise<
   ItemsCategory[]
> => {
   try {
      return await prisma.itemsCategory.findMany({
         orderBy: { name: 'asc' },
         include: {
            subCategories: true,
         },
      });
   } catch (error) {
      console.error('Error fetching inventory categories:', error);
      throw new Error('Failed to fetch inventory categories');
   }
};
export const getCategory = async (): Promise<ItemsCategory[]> => {
   try {
      return await prisma.itemsCategory.findMany({
         orderBy: { name: 'asc' },
      });
   } catch (error) {
      console.error('Error fetching inventory categories:', error);
      throw new Error('Failed to fetch inventory categories');
   }
};

export const getSubCategory = async (): Promise<ItemsSubCategory[]> => {
   try {
      return await prisma.itemsSubCategory.findMany({
         orderBy: { name: 'asc' },
      });
   } catch (error) {
      console.error('Error fetching inventory categories:', error);
      throw new Error('Failed to fetch inventory categories');
   }
};

type CreateCategoryResponse = {
   category: ItemsCategory;
   status: string;
};

type CreateCategoryInput = {
   name: string;
   subCategories?: { name: string }[];
};

export const createCategory = async (
   data: CreateCategoryInput
): Promise<CreateCategoryResponse> => {
   const { name, subCategories } = data;

   try {
      const createdCategory = await prisma.$transaction(async (prisma) => {
         //Todo: Create the main category
         const category = await prisma.itemsCategory.create({
            data: {
               name,
            },
         });

         //Todo: If there are subcategories, create them
         if (subCategories && subCategories.length > 0) {
            const subCategoryPromises = subCategories.map((subCategory) => {
               return prisma.itemsSubCategory.create({
                  data: {
                     name: subCategory.name,
                     categoryId: category?.itemsCategoryId,
                  },
               });
            });
            await Promise.all(subCategoryPromises);
         }

         return category;
      });

      return {
         category: createdCategory,
         status: 'success',
      };
   } catch (error) {
      console.error('Error creating inventory category:', error);
      throw new Error('Failed to create inventory category');
   }
};

type UpdateCategoryInput = {
   name: string;
   subCategories?: { itemsSubCategoryId: number; name: string }[];
};

type UpdateCategoryResponse = {
   status: string;
};

export const updateCategory = async (
   categoryId: string,
   data: UpdateCategoryInput
): Promise<UpdateCategoryResponse> => {
   console.log(data.subCategories);
   try {
      const existingCategory = await prisma.itemsCategory.findUnique({
         where: {
            itemsCategoryId: Number(categoryId),
         },
         include: {
            subCategories: true,
         },
      });

      if (!existingCategory) {
         return { status: 'error' };
      }

      const valueToUpdate = {
         name: data.name ? data.name : existingCategory.name,
      };

      if (data.subCategories) {
         const subCategoryPromises = data.subCategories.map((subCategory) => {
            if (subCategory.name) {
               return prisma.itemsSubCategory.update({
                  where: {
                     itemsSubCategoryId: subCategory.itemsSubCategoryId,
                  },
                  data: {
                     name: subCategory.name,
                  },
               });
            }

            throw new Error('Subcategory name is required');
         });
         await Promise.all(subCategoryPromises);
      }

      await prisma.itemsCategory.update({
         where: {
            itemsCategoryId: Number(categoryId),
         },
         data: valueToUpdate,
      });

      return { status: 'success' };
   } catch (error) {
      return { status: 'error' };
   }
};
