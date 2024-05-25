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
}

export default Services;
