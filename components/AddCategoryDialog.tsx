'use client';

import CreateCategoryForm from '@/forms/CreateCategoryForm';
import { useModal } from '@/providers/model-provider';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

export function AddCategoryDialog() {
   const { setOpen } = useModal();

   const handleOpen = () => {
      setOpen({
         content: <CreateCategoryForm />,
      });
   };

   return (
      <Button onClick={handleOpen}>
         <Plus size={16} className='mr-2' />
         Add Category
      </Button>
   );
}
