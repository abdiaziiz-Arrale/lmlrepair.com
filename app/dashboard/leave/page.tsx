import React from "react";
import { getLeaves } from "@/lib/db/leaveCrud";
import CustomContainer from "@/components/CustomContainer";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
import { redirect } from "next/navigation";
import LeaveTable from "./LeaveTable";
const Leave = async () => {
  const staffInSession: Session | null = await getServerSession(authOptions);
  if (!staffInSession) {
    redirect("/");
  }

  let leave: any = [];
  let error = "";

  try {
    if (staffInSession.user.role === "manager") {
      leave = await getLeaves();
    } else {
      leave = await getLeaves(staffInSession.user.staff_id);
    }
  } catch (err) {
    console.error("Error fetching leave:", err);
    error = "Check your internet connection.";
  }
  return (
    <CustomContainer>
      <div className="flex flex-col justify-center gap-8">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <LeaveTable
            leave={leave}
            isManager={staffInSession.user.role === "manager" ? true : false}
          />
        )}
      </div>
    </CustomContainer>
  );
};

export default Leave;
