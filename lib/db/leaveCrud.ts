"use server";

import prisma from "@/lib/prisma";
import { Leave } from "@prisma/client";
import { PartialBy } from "../type";

export const getLeaves = async (staffId?: number): Promise<Leave[]> => {
  try {
    return await prisma.leave.findMany({
      where: { staff_id: staffId },
      orderBy: { leave_id: "asc" },
      include: {
        staff: {
          select: {
            staff_name: true,
            email: true,
            mobile_number: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    throw new Error("Failed to fetch leaves");
  }
};

export const createLeave = async (
  leaveData: PartialBy<Leave, "leave_id" | "status">
) => {
  try {
    return await prisma.leave.create({
      data: leaveData,
    });
  } catch (error) {
    console.error("Error creating leave:", error);
    throw new Error("Failed to create leave");
  }
};

export const updateLeave = async (
  leaveId: number,
  updatedData: PartialBy<
    Leave,
    "leave_id" | "description" | "end_date" | "start_date" | "type" | "staff_id"
  >
) => {
  try {
    return await prisma.leave.update({
      where: { leave_id: leaveId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating leave:", error);
    throw new Error("Failed to update leave");
  }
};
