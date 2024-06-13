'use client';

import { useModal } from '@/providers/model-provider';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import CreateTransferItemForm from '@/forms/TransferItemForm';

export function TransferItemDialog() {
   const { setOpen } = useModal();

   const handleOpen = () => {
      setOpen({
         content: <CreateTransferItemForm />,
      });
   };

   return (
      <Button onClick={handleOpen}>
         <Plus size={16} className='mr-2' />
         Transfer Item
      </Button>
   );
}
