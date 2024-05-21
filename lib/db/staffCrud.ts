"use server";

import prisma from "@/lib/prisma";
import { Staff } from "@prisma/client";
import { PartialBy } from "../type";

export const getStaffs = async (): Promise<Staff[]> => {
  try {
    return await prisma.staff.findMany({
      orderBy: { staff_name: "asc" },
    });
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw new Error("Failed to fetch staff");
  }
};

export const createStaff = async (staffData: PartialBy<Staff, "staff_id">) => {
  try {
    return await prisma.staff.create({
      data: staffData,
    });
  } catch (error) {
    console.error("Error creating staff:", error);
    throw new Error("Failed to create staff");
  }
};

export const updateStaff = async (staffId: number, updatedData: Staff) => {
  try {
    return await prisma.staff.update({
      where: { staff_id: staffId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating staff:", error);
    throw new Error("Failed to update staff");
  }
};
