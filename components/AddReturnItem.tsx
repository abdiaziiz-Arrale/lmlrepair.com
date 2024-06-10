'use client';

import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useModal } from '@/providers/model-provider';

export function AddReturnItemDialog() {
   const { setOpen } = useModal();

   const handleOpen = () => {
      setOpen({
         title: 'Add Return Item',
         subheading: 'Provide the details below',
         content: (
            <div>
               <p className='text-red-800'>
                  This is where the form or content for adding a return item
                  will go.
               </p>
            </div>
         ),
      });
   };

   return (
      <Button onClick={handleOpen}>
         <Plus size={16} className='mr-2' />
         Add Return Item
      </Button>
   );
}
