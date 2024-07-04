import CustomContainer from "@/components/CustomContainer";
import { getAnnouncement } from "@/lib/db/announcementCrud";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
import { redirect } from "next/navigation";
import AnnouncementsTable from "@/components/AnnouncementTable";

async function Announcements() {
  const staffInSession: Session | null = await getServerSession(authOptions);
  if (!staffInSession) {
    redirect("/");
  }
  let announcements: any = [];
  let error = "";

  try {
    announcements = await getAnnouncement();
  } catch (err) {
    console.error("Error fetching announcements:", err);
    error = "Check your internet connection.";
  }
  return (
    <CustomContainer>
      <div className="flex flex-col justify-center gap-8">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <AnnouncementsTable announcements={announcements} />
        )}
      </div>
    </CustomContainer>
  );
}

export default Announcements;
