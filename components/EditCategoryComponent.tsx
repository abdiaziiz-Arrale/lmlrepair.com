'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateCategory } from '@/lib/db/ItemCategoryCrud';
import { ItemsCategory, ItemsSubCategory } from '@prisma/client';
import { CircleDashedIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from './ui/use-toast';

type EditCategoriesProps = {
   categories: ItemsCategory[];
   itemSubCategories: ItemsSubCategory[];
};

export default function EditCategories({
   categories,
   itemSubCategories,
}: EditCategoriesProps) {
   const router = useRouter();
   const { categoryId } = useParams();
   const { register, handleSubmit } = useForm();
   const [subCategories, setSubCategories] = useState<string[]>([]);
   const [isPending, startTransition] = useTransition();
   const { toast } = useToast();

   const categorySelected = categories.find(
      (category) => category.itemsCategoryId === Number(categoryId)
   );

   const subCategoriesSelected = itemSubCategories.filter(
      (subCategory) => subCategory.categoryId === Number(categoryId)
   );

   const handleAddSubCategory = () => {
      setSubCategories([...subCategories, '']);
   };

   const handleSubCategoryChange = (index: number, value: string) => {
      const updatedSubCategories = [...subCategories];
      updatedSubCategories[index] = value;
      setSubCategories(updatedSubCategories);
   };

   const onSubmit = (data: any) => {
      startTransition(async () => {
         try {
            const res = await updateCategory(categoryId as string, {
               name: data.category,
               subCategories: subCategoriesSelected.map(
                  (subCategory, index) => ({
                     itemsSubCategoryId: subCategory.itemsSubCategoryId,
                     name: data.subCategory[index],
                  })
               ),
            });

            if (res.status === 'success') {
               toast({
                  title: 'Category updated successfully',
                  description: 'The category has been updated successfully',
               });
               router.push('/dashboard/inventory/categories');
            }
         } catch (error) {
            toast({
               title: 'An error occurred',
               description: 'An error occurred while updating the category',
            });
         }
      });
   };

   return (
      <div className='flex h-screen'>
         <div className='m-auto p-8 rounded-lg w-1/2'>
            <div className='flex justify-between items-center mb-8'>
               <Link href={'/dashboard/inventory/categories'}>
                  <Button variant={'ghost'}>
                     <X className='h-6 w-6 text-gray-500' />
                  </Button>
               </Link>
               <h1 className='text-xl font-semibold'>Edit Category</h1>
               <Button
                  onClick={handleSubmit(onSubmit)}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
               >
                  {isPending ? (
                     <CircleDashedIcon size={20} className='animate-spin' />
                  ) : (
                     'Edit'
                  )}
               </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className='mb-4'>
                  <div className='mb-2'>
                     <Label
                        htmlFor='category'
                        className='block text-gray-700 text-sm font-bold mb-2'
                     >
                        Category
                     </Label>
                     <Input
                        id='category'
                        defaultValue={categorySelected?.name || ''}
                        {...register('category')}
                        placeholder='e.g Parts'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     />
                  </div>
                  <div className='mb-6'>
                     <Label
                        htmlFor='sub-categories'
                        className='block text-gray-700 text-sm font-bold mb-2'
                     >
                        Sub Categories
                     </Label>
                     {subCategoriesSelected.map((subCategory, index) => (
                        <div key={index} className='mb-2'>
                           <Input
                              id={`sub-category-${index}`}
                              defaultValue={subCategory.name}
                              {...register(`subCategory[${index}]`)}
                              placeholder='e.g Engine'
                              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                           />
                        </div>
                     ))}
                  </div>
                  {subCategories.map((subCategory, index) => (
                     <div key={index} className='mb-2'>
                        <Input
                           id={`new-sub-category-${index}`}
                           value={subCategory}
                           onChange={(e) =>
                              handleSubCategoryChange(index, e.target.value)
                           }
                           placeholder='New Subcategory'
                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                     </div>
                  ))}
                  <Button
                     type='button'
                     onClick={handleAddSubCategory}
                     className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
                  >
                     Add
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
}
