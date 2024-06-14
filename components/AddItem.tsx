'use client';

import { getCategory, getSubCategory } from '@/lib/db/ItemCategoryCrud';
import { getLocations } from '@/lib/db/ItemLocationCrud';
import { useModal } from '@/providers/model-provider';
import { CircleDashedIcon, Plus } from 'lucide-react';
import { useTransition } from 'react';
import CreateNewItemForm from '../forms/CreateItemForm';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export function AddItemDialog() {
   const { setOpen } = useModal();
   const { toast } = useToast();
   const [isPending, startTransition] = useTransition();

   const handleOpen = () => {
      startTransition(async () => {
         try {
            //Todo: Fetch categories, subcategories, and locations
            const categories = await getCategory();
            const subCategories = await getSubCategory();
            const locations = await getLocations();

            setOpen({
               content: (
                  <CreateNewItemForm
                     categories={categories}
                     subCategories={subCategories}
                     locations={locations}
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
            <Button className=' animate-pulse cursor-pointer'>Add Item</Button>
         ) : (
            <Button onClick={handleOpen}>
               <Plus size={20} />
               Add Item
            </Button>
         )}
      </>
   );
}
