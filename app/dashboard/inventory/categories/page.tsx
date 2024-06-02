import CategoryTable from '@/components/CategoryTable';
import { DatePickerDemo } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCategory } from '@/lib/db/ItemCategoryCrud';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export async function fetchCategories() {
   try {
      const categories = await getCategory();
      return { categories, error: null };
   } catch (err) {
      return { categories: [], error: 'Check your internet connection.' };
   }
}

async function Categories() {
   const { categories, error } = await fetchCategories();

   return (
      <div className='flex flex-col gap-0'>
         <div className='space-y-3'>
            <div className='flex items-center justify-between'>
               <div className='space-y-1'>
                  <h1 className='text-2xl font-medium'>Item Categories</h1>
                  <p className='text-sm'>Manage your item categories</p>
               </div>
               <div className='flex items-center gap-3'>
                  <div className='flex items-center gap-3'>
                     <DatePickerDemo />
                  </div>
                  <Link href={'/inventory/createCategory/new'}>
                     <Button className='space-x-2'>
                        <Plus size={20} />
                        <span>Add Category</span>
                     </Button>
                  </Link>
               </div>
            </div>

            <Input
               placeholder='Search Category. . . . .'
               className='max-w-96 '
            />
         </div>

         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            <CategoryTable categories={categories} />
         )}
      </div>
   );
}

export default Categories;
