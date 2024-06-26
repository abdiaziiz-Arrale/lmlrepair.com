import React from "react";
import { getLeaves } from "@/lib/db/leaveCrud";
import CustomContainer from "@/components/CustomContainer";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
import { redirect } from "next/navigation";
import AddLeave from "./AddLeave";
const Leave = async () => {
  const staffInSession: Session | null = await getServerSession(authOptions);
  if (!staffInSession) {
    redirect("/");
  }
  let error = "";

  return (
    <CustomContainer>
      <div className="flex flex-col justify-center gap-8">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <AddLeave staffId={staffInSession.user.staff_id} />
        )}
      </div>
    </CustomContainer>
  );
};

export default Leave;
