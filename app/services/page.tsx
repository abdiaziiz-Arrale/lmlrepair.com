import Footer from "@/components/website/footer";
import Header from "@/components/website/header";
import { getServices } from "@/lib/db/serviceCrud";
import { Service } from "@prisma/client";
import Link from "next/link";

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
        <section className="flex flex-col justify-center items-center p-5">
          <h1 className="text-4xl tracking-widest text-yellow-300">Services</h1>
          <p className="text-md">
            Select the service category you are interested in
          </p>
        </section>

        <article className="flex flex-col md:flex-row flex-wrap gap-5 justify-center text-center p-10">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            services.map((service) => (
              <figure
                key={service.service_id}
                className="bg-gray-100 rounded-lg flex flex-col justify-center items-center gap-10 py-14 md:py-6 p-5"
              >
                <div>
                  <figcaption>{service.service_name}</figcaption>
                </div>
                <div>
                  {service.service_type === "repairs_service" ? (
                    <Link href="/services/brands">
                      <img
                        className="rounded-lg w-48 h-52"
                        src={service.service_image}
                        alt={service.service_name}
                        width={100}
                        height={100}
                      />
                    </Link>
                  ) : (
                    <Link href={`/services/${service.service_id}`}>
                      <img
                        className="rounded-lg w-48 h-52"
                        src={service.service_image}
                        alt={service.service_name}
                        width={100}
                        height={100}
                      />
                    </Link>
                  )}
                </div>
              </figure>
            ))
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
