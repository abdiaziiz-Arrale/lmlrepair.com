import React from "react";
import StaffTable from "./StaffTable";
import { getStaffs } from "@/lib/db/staffCrud";
import CustomContainer from "@/components/CustomContainer";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
import { redirect } from "next/navigation";
const Staff = async () => {
  const staffInSession: Session | null = await getServerSession(authOptions);
  if (!staffInSession) {
    redirect("/");
  }
  let staff: any = [];
  let error = "";

  try {
    staff = await getStaffs();
  } catch (err) {
    console.error("Error fetching staff:", err);
    error = "Check your internet connection.";
  }
  return (
    <CustomContainer>
      <div className="flex flex-col justify-center gap-8">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <StaffTable staff={staff} />
        )}
      </div>
    </CustomContainer>
  );
};

export default Staff;
