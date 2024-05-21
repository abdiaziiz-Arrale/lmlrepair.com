import React from 'react';
import CustomContainer from './CustomContainer';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

function ServicesNavbar() {
   return (
      <CustomContainer>
         <h1 className='text-3xl px-2 mb-4'>Services</h1>
         <Card className=''>
            <div className='flex justify-between items-center gap-5 px-3 py-6'>
               <div className='flex items-center border border-primary-foreground px-3 rounded-md '>
                  <Search />
                  <Input
                     placeholder='Search service...'
                     className='w-96 border-none focus-visible:outline-none '
                  />
               </div>
               <Button className='text-secondary'>Add new</Button>
            </div>
         </Card>
      </CustomContainer>
   );
}

export default ServicesNavbar;
