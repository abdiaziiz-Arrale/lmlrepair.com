"use server";

import prisma from "@/lib/prisma";
import { Service } from "@prisma/client";

export const getServices = async (): Promise<Service[]> => {
  try {
    return await prisma.service.findMany({
      orderBy: { service_name: "asc" },
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    throw new Error("Failed to fetch service");
  }
};

export const createService = async (serviceData: any) => {
  try {
    return await prisma.service.create({
      data: serviceData,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    throw new Error("Failed to create service");
  }
};

export const updateService = async (
  serviceId: number,
  updatedData: Service
) => {
  try {
    return await prisma.service.update({
      where: { service_id: serviceId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    throw new Error("Failed to update service");
  }
};
