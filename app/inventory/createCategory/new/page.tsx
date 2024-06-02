'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon, X } from 'lucide-react';
import Link from 'next/link';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

type Inputs = {
   category: string;
   subCategories: { value: string }[];
};

function CreateNewCategory() {
   //Todo: Add sub category
   const {
      register,
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>();

   //Todo: Add sub category
   const { fields, append } = useFieldArray({
      control,
      name: 'subCategories',
   });

   //Todo: Add sub category
   const handleAddSubCategory = () => {
      append({ value: '' });
   };

   //Todo: Handle submitting the form
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log(data);
   };

   return (
      <div className='flex flex-col'>
         <div className='sticky top-0 z-50 flex items-center justify-between p-6 bg-white'>
            <Link href={'/dashboard/inventory/categories'}>
               <Button variant={'secondary'}>
                  <X size={20} />
               </Button>
            </Link>
            <h1 className='text-xl font-medium'>Create Category</h1>
            <Button type='submit' onClick={handleSubmit(onSubmit)}>
               Save
            </Button>
         </div>
         <div className='flex flex-col items-center p-6 space-y-4'>
            <h1 className='font-bold text-lg'>Details</h1>
            <form
               className='space-y-4 w-full max-w-lg'
               onSubmit={handleSubmit(onSubmit)}
            >
               <div>
                  <Label className='block mb-1'>Category</Label>
                  <Input
                     placeholder='e.g Parts'
                     className='w-full'
                     {...register('category', { required: true })}
                  />
                  {errors.category && (
                     <span className='text-red-500'>
                        This field is required
                     </span>
                  )}
               </div>
               <div className='flex flex-col space-y-4 mb-4'>
                  <label htmlFor='sub-categories' className='font-semibold'>
                     Sub Categories
                  </label>
                  {fields.map((field, index) => (
                     <Input
                        key={field.id}
                        placeholder='e.g Screen, Battery, etc'
                        {...register(`subCategories.${index}.value`)}
                     />
                  ))}
                  <Button
                     type='button'
                     variant='default'
                     className='flex items-center space-x-1'
                     onClick={handleAddSubCategory}
                  >
                     <PlusIcon size={20} />
                     <span>Add</span>
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreateNewCategory;
