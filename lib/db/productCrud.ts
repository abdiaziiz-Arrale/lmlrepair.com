"use server";

import prisma from "@/lib/prisma";
import { Products } from "@prisma/client";
import { PartialBy } from "../type";

export const getProducts = async (): Promise<Products[]> => {
  try {
    return await prisma.products.findMany({
      orderBy: { product_name: "asc" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const createProduct = async (
  productData: PartialBy<Products, "product_id">
) => {
  try {
    return await prisma.products.create({
      data: productData,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
};

export const updateProduct = async (
  productId: number,
  updatedData: PartialBy<Products, "product_id" | "product_image">
) => {
  try {
    return await prisma.products.update({
      where: { product_id: productId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};
