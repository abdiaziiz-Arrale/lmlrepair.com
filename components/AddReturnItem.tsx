'use client';

import CreateReturnItemForm from '@/forms/CreateReturnItemForm';
import { useModal } from '@/providers/model-provider';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

export function AddReturnItemDialog() {
   const { setOpen } = useModal();

   const handleOpen = () => {
      setOpen({
         content: <CreateReturnItemForm />,
      });
   };

   return (
      <Button onClick={handleOpen}>
         <Plus size={16} className='mr-2' />
         Add Return Item
      </Button>
   );
}
