"use client";

import { Search } from "lucide-react";
import CustomContainer from "@/components/CustomContainer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import EditLeave from "@/components/EditLeave";
import { Badge } from "@/components/ui/badge";

interface LeaveTableProps {
  leave: any[];
  isManager: boolean;
}
function LeaveTable({ leave, isManager }: LeaveTableProps) {
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
  };

  const filteredLeave = leave.filter((leave) => {
    return (
      search.toLowerCase() === "" ||
      leave.staff.staff_name.toLowerCase().includes(search)
    );
  });
  return (
    <CustomContainer>
      <h1 className="text-3xl px-2 mb-4">Leave requests</h1>
      <Card className="mb-4">
        <div className="flex justify-between items-center gap-5 px-3 py-6">
          <div className="flex items-center border border-primary-foreground px-3 rounded-md ">
            <Search />
            <Input
              placeholder="Search staff name"
              className="lg:w-96 border-none focus-visible:outline-none "
              onChange={handleInputChange}
            />
          </div>
        </div>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile number</TableHead>
            <TableHead className="w-80">Start date</TableHead>
            <TableHead className="w-80">End Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeave.map((leave) => (
            <TableRow key={leave.leave_id}>
              <TableCell>{leave.staff.staff_name}</TableCell>
              <TableCell>{leave.staff.email}</TableCell>
              <TableCell>{leave.staff.mobile_number}</TableCell>
              <TableCell>{leave.start_date}</TableCell>
              <TableCell>{leave.end_date}</TableCell>
              <TableCell>{leave.description}</TableCell>

              {isManager ? (
                <TableCell>
                  <EditLeave leaveId={leave.leave_id} status={leave.status} />
                </TableCell>
              ) : (
                <TableCell>
                  <Badge
                    className={
                      leave.status === "pending"
                        ? "bg-yellow-500 "
                        : leave.status === "approved"
                        ? "bg-green-500"
                        : leave.status === "declined"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }
                  >
                    {leave.status}
                  </Badge>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomContainer>
  );
}

export default LeaveTable;
