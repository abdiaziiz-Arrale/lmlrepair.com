import CustomContainer from '@/components/CustomContainer';
import ServicesNavbar from '@/components/ServicesNavbar';
import ServicesTable from '@/components/ServicesTable';
import React from 'react';

function Services() {
   return (
      <CustomContainer>
         <div className='flex flex-col justify-center gap-8 '>
            <ServicesNavbar />
            <ServicesTable />
         </div>
      </CustomContainer>
   );
}

export default Services;
