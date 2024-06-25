"use server";

import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { PartialBy } from "../type";

export const getCategory = async (serviceId: number): Promise<Category[]> => {
  try {
    return await prisma.category.findMany({
      where: { service_id: serviceId },
      include: { Service: true },
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
  updatedData: PartialBy<Category, "category_id" | "service_id">
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

export const deleteCategory = async (categoryId: number) => {
  try {
    await prisma.category.delete({
      where: {
        category_id: categoryId,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
