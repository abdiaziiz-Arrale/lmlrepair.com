import ItemReturnTable from '@/components/ItemReturnTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function ReturnsPage() {
   return (
      <div className='space-y-3'>
         <div className='flex items-center justify-between'>
            <div>
               <h1 className='text-2xl font-medium'>Return Items List</h1>
               <p className='text-sm'>Here all Returned Items data</p>
            </div>
            <Link href={'/inventory/return/newReturn'}>
               <Button className='space-x-1'>
                  <Plus size={20} />
                  <span>Add Return</span>
               </Button>
            </Link>
         </div>
         <Input placeholder='Search Item Return...' className='max-w-96 ' />
         <ItemReturnTable />
      </div>
   );
}

export default ReturnsPage;
