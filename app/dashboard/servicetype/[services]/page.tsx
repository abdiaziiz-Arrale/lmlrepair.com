import CustomContainer from "@/components/CustomContainer";
import ServicesTable from "@/components/ServicesTable";
import { getServices } from "@/lib/db/serviceCrud";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";
import { redirect } from "next/navigation";

interface ServicesSearchParams {
  searchParams?: { servicetype?: string };
}

async function Services({ searchParams }: ServicesSearchParams) {
  const staffInSession: Session | null = await getServerSession(authOptions);
  if (!staffInSession) {
    redirect("/");
    return null; // Ensure no further processing if redirected
  }

  let services: any[] = [];
  let error = "";
  const serviceType = searchParams?.servicetype;

  if (!serviceType) {
    error = "No service type specified.";
  } else {
    try {
      services = await getServices(serviceType);
      if (!services) {
        error = "No services found for the specified service type.";
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      error = "Check your internet connection.";
    }
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
