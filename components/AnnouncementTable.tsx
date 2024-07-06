"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import CustomContainer from "./CustomContainer";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import { AnnouncementBadge } from "@prisma/client";
import EditAnnouncement from "./EditAnnouncement";
import AddAnnouncement from "./AddAnnouncement";
import DeleteAnnouncement from "./DeleteAnnoucement";

interface AnnouncementsTableProps {
  announcements: AnnouncementBadge[];
}

function AnnouncementsTable({ announcements }: AnnouncementsTableProps) {
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
  };

  const filteredAnnouncements = announcements.filter((announcement: any) => {
    
    return (
      search.toLowerCase() === "" ||
      announcement.content.toLowerCase().includes(search)
    );
  });

  return (
    <CustomContainer>
      <h1 className="text-3xl px-2 mb-4">Announcements </h1>
      <Card className="mb-4">
        <div className="flex justify-between items-center gap-5 px-3 py-6">
          <div className="flex items-center border border-primary-foreground px-3 rounded-md ">
            <Search />
            <Input
              placeholder="Search announcements"
              className="lg:w-96 border-none focus-visible:outline-none "
              onChange={handleInputChange}
            />
          </div>
          <AddAnnouncement />
        </div>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-72">Content</TableHead>
            <TableHead className="w-80">Tag</TableHead>
            <TableHead className="w-80">Active</TableHead>
            <TableHead className="w-80">Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAnnouncements.map((announcement:any) => (
            <TableRow key={announcement.announcementId}>
              <TableCell>{announcement.content}</TableCell>
              <TableCell>{announcement.tag}{ announcement.active }</TableCell>
              <TableCell>{announcement.Active ? "Active" : "Inactive"}</TableCell>
              <TableCell>{new Date(announcement.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <EditAnnouncement
                  announcementId={announcement.announcementId}
                  content={announcement.content}
                  tag={announcement.tag}
                  active={announcement.active}
                  
                />
              </TableCell>
              <TableCell>
                <DeleteAnnouncement announcementId={announcement.announcementId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomContainer>
  );
}

export default AnnouncementsTable;
