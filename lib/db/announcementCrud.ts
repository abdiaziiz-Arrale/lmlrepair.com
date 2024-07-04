"use server";

import prisma from "@/lib/prisma";
import {AnnouncementBadge } from "@prisma/client";
import { PartialBy } from "../type";

export const getAnnouncement = async (): Promise<AnnouncementBadge[]> => {
  try {
    return await prisma.announcementBadge.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching announcement:", error);
    throw new Error("Failed to fetch Announcement");
  }
};



export const createAnnouncement = async (announcementData: PartialBy<AnnouncementBadge, "announcementId">) => {
  try {
    return await prisma.announcementBadge.create({
      data: announcementData,
    });
  } catch (error) {
    console.error("Error creating Announcement:", error);
    throw new Error("Failed to create Announcement");
  }
};

export const updateAnnouncement = async (
  announcementId: number,
  updatedData: PartialBy<AnnouncementBadge, "announcementId" >
) => {
  try {
    return await prisma.announcementBadge.update({
      where: { announcementId: announcementId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating Announcement:", error);
    throw new Error("Failed to update Announcement");
  }
};

export const deleteAnnouncement = async (announcementId: number) => {
  try {
    console.log(announcementId,"kkk");
    await prisma.announcementBadge.delete({
      where: {
        announcementId: announcementId,
      },
    });
  } catch (error) {
    console.error("Error deleting announcement:", error);
  } finally {
    await prisma.$disconnect();
  }
};
