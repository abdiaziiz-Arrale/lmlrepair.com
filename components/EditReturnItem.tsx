'use client';

import EditReturnItemForm from '@/forms/EditReturnItemForm';
import { useModal } from '@/providers/model-provider';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

type stockReturnIdProps = {
   stockReturnId: number;
};

export function EditReturnItemDialog({ stockReturnId }: stockReturnIdProps) {
   const { setOpen } = useModal();

   const handleOpen = () => {
      setOpen({
         content: <EditReturnItemForm returnItemId={stockReturnId} />,
      });
   };

   return (
      <Pencil
         size={20}
         className='mr-2 cursor-pointer text-blue-500 font-medium'
         onClick={handleOpen}
      />
   );
}
