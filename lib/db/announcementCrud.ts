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
        console.log(announcementData);

       const { Active, ...dataWithoutIsActive } = announcementData;
    const createdAnnouncement = await prisma.announcementBadge.create({
      data: {
        ...dataWithoutIsActive,
        Active: Active ?? false, 
      },
    });

    if (Active) {
      await prisma.announcementBadge.updateMany({
        where: {
          announcementId: { not: createdAnnouncement.announcementId },
        },
        data: {
          Active: false,
        },
      });
    }

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
   const announcements = await prisma.announcementBadge.findMany();

    const announcementToUpdate = announcements.find((announcement) => announcement.announcementId === announcementId);

    if (!announcementToUpdate) {
      throw new Error(`Announcement with ID ${announcementId} not found`);
    }

    const updatePromises = announcements.map((announcement) => {
      if (announcement.announcementId === announcementId) {
        return prisma.announcementBadge.update({
          where: { announcementId: announcementId },
          data: updatedData,
        });
      } else {
        return prisma.announcementBadge.update({
          where: { announcementId: announcement.announcementId },
          data: { Active: false },
        });
      }
    });

    await Promise.all(updatePromises);

    return await prisma.announcementBadge.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error updating Announcement:", error);
    throw new Error("Failed to update Announcement");
  }
};

export const deleteAnnouncement = async (announcementId: number) => {
  try {
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
