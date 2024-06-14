'use client';

import EditCategoryForm from '@/forms/EditCategoryForm';
import { getCategory, getSubCategory } from '@/lib/db/ItemCategoryCrud';
import { useModal } from '@/providers/model-provider';
import { Pencil } from 'lucide-react';
import { useTransition } from 'react';
import { useToast } from './ui/use-toast';

type EditCategoryDialogProps = {
   categoryId: number;
};

export function EditCategoryDialog({ categoryId }: EditCategoryDialogProps) {
   const { setOpen } = useModal();
   const { toast } = useToast();
   const [isPending, startTransition] = useTransition();

   const handleOpen = async () => {
      startTransition(async () => {
         try {
            // Todo: Fetch categories and subcategories
            const categories = await getCategory();
            const subCategories = await getSubCategory();

            setOpen({
               content: (
                  <EditCategoryForm
                     categoryId={categoryId}
                     categories={categories}
                     itemSubCategories={subCategories}
                  />
               ),
            });
         } catch (error) {
            toast({
               title: 'Error',
               description: 'Check your internet connection.',
            });
         }
      });
   };

   return (
      <>
         {isPending ? (
            <Pencil
               size={18}
               className='text-blue-500 animate-pulse cursor-pointer'
            />
         ) : (
            <Pencil
               size={18}
               className='text-blue-500 cursor-pointer'
               onClick={handleOpen}
            />
         )}
      </>
   );
}
