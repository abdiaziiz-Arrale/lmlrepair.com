import { getServices } from "@/lib/db/serviceCrud";
import React from "react";
import CreateService from "./CreateService";

const ServicesPage = async () => {
  const services = await getServices();
  return (
    <div className="flex justify-around mt-10 bg-emerald-500">
      <CreateService />

      <div className="services-container">
        <h2 className="font-bold">Our Services</h2>
        <div className="services-list">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <h3>{service.service_name}</h3>
              <p>{service.service_type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
