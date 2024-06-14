'use client';

import EditLocationForm from '@/forms/EditLocationForm';
import EditReturnItemForm from '@/forms/EditReturnItemForm';
import { useModal } from '@/providers/model-provider';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

type locationProps = {
   locationId: number;
};

export function EditLocationDialog({ locationId }: locationProps) {
   const { setOpen } = useModal();

   const handleOpen = () => {
      setOpen({
         content: <EditLocationForm locationId={locationId} />,
      });
   };

   return (
      <Pencil
         size={18}
         className='text-blue-500 mr-2 cursor-pointer'
         onClick={handleOpen}
      />
   );
}
