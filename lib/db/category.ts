"use server";

import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { PartialBy } from "../type";

export const getCategory = async (categoryId: number): Promise<Category[]> => {
  try {
    return await prisma.category.findMany({
      where: { category_id: categoryId },
      orderBy: { type_Of_Repair: "asc" },
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("Failed to fetch category");
  }
};

export const createCategory = async (
  categoryData: PartialBy<Category, "category_id">
) => {
  try {
    return await prisma.category.create({
      data: categoryData,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
};

export const updateCategory = async (
  categoryId: number,
  updatedData: Category
) => {
  try {
    return await prisma.category.update({
      where: { category_id: categoryId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category");
  }
};
