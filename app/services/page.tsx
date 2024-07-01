import Footer from "@/components/website/footer";
import Header from "@/components/website/header";
import { getServices } from "@/lib/db/serviceCrud";
import { Service } from "@prisma/client";
import Link from "next/link";
import ServicesCardsComponent from "./ServicesCardsComponent";

export default async function Services() {
  let services: Service[] = [];
  let error = "";

  try {
    services = await getServices();
  } catch (err) {
    console.error("Error fetching services:", err);
    error = "Check your internet connection.";
  }

  return (
    <>
      <Header />
      <main className="p-5 mt-10 md:mt-20 md:mx-4">
      <div>
        <ServicesCardsComponent/>
      </div>
      </main>
      <Footer />
    </>
  );
}
