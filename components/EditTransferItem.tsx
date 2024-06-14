'use client';

import EditTransferItemForm from '@/forms/EditTransferItemForm';
import { useModal } from '@/providers/model-provider';
import { Pencil } from 'lucide-react';

type InternalTransferId = {
   transferId: number;
};

export function EditTransferItemDialog({ transferId }: InternalTransferId) {
   const { setOpen } = useModal();

   const handleOpen = () => {
      setOpen({
         content: <EditTransferItemForm transferId={transferId} />,
      });
   };

   return (
      <Pencil
         size={20}
         className='text-blue-500  cursor-pointer'
         onClick={handleOpen}
      />
   );
}
