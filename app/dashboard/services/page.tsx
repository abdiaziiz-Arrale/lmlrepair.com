<<<<<<< HEAD
import CustomContainer from '@/components/CustomContainer';
import ServicesTable from '@/components/ServicesTable';
import { getServices } from '@/lib/db/serviceCrud';
import React from 'react';

async function Services() {
   const services = await getServices();

   return (
      <CustomContainer>
         <div className='flex flex-col justify-center gap-8 '>
            <ServicesTable services={services} />
         </div>
      </CustomContainer>
   );
=======
import React from "react";
import CustomContainer from "@/components/CustomContainer";
import ServicesTable from "@/components/ServicesTable";
import { getServices } from "@/lib/db/serviceCrud";

async function Services() {
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
>>>>>>> 2cc34c3ce5263618fee76240892faaab5d161e06
}

export default Services;
