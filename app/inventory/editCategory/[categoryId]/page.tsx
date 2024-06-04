'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function EditCategories() {
   const [subCategories, setSubCategories] = useState(['']);
   const handleAddSubCategory = () => {
      setSubCategories([...subCategories, '']);
   };
   const handleSubCategoryChange = (index: number, value: string) => {
      const updatedSubCategories = [...subCategories];
      updatedSubCategories[index] = value;
      setSubCategories(updatedSubCategories);
   };

   return (
      <div className='flex h-screen '>
         <div className='m-auto  p-8 rounded-lg  w-1/2'>
            <div className='flex justify-between items-center mb-8'>
               <Link href={'/dashboard/inventory/categories'}>
                  <Button variant={'ghost'}>
                     <X className='h-6 w-6 text-gray-500' />
                  </Button>
               </Link>
               <h1 className='text-xl font-semibold'>Edit Category</h1>
               <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Save
               </Button>
            </div>
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
                  {subCategories.map((subCategory, index) => (
                     <div key={index} className='mb-2'>
                        <Input
                           id={`sub-category-${index}`}
                           placeholder={`e.g Screen, Battery, etc`}
                           value={subCategory}
                           onChange={(e) =>
                              handleSubCategoryChange(index, e.target.value)
                           }
                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                     </div>
                  ))}
                  <Button
                     onClick={handleAddSubCategory}
                     className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
                  >
                     Add
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
