'use client';

import CreateNewLocationForm from '@/forms/CreateLocationForm';
import { useModal } from '@/providers/model-provider';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

export function AddLocationDialog() {
   const { setOpen } = useModal();

   const handleOpen = () => {
      setOpen({
         content: <CreateNewLocationForm />,
      });
   };

   return (
      <Button onClick={handleOpen}>
         <Plus size={16} className='mr-2' />
         Add Location
      </Button>
   );
}
