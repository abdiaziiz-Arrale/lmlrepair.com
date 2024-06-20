import CustomContainer from "@/components/CustomContainer";
import ServicesTable from "@/components/ServicesTable";
import { getServices } from "@/lib/db/serviceCrud";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
import { redirect } from "next/navigation";
async function Services() {
  const staffInSession: Session | null = await getServerSession(authOptions);
  if (!staffInSession) {
    redirect("/");
  }
  let services: any = [];
  let error = "";

  try {
    services = await getServices();
  } catch (err) {
    console.error("Error fetching services:", err);
    error = "Check your internet connection.";
  }

  return (
    <CustomContainer>
      <div className="flex flex-col justify-center gap-8">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <ServicesTable services={services} />
        )}
      </div>
    </CustomContainer>
  );
}

export default Services;
