'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { createCategory } from '@/lib/db/ItemCategoryCrud';
import { useModal } from '@/providers/model-provider';
import { CircleDashedIcon, PlusIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

type Inputs = {
   name: string;
   subCategories: { name: string }[];
};

function CreateCategoryForm() {
   const router = useRouter();
   const { toast } = useToast();
   const { setClose } = useModal();
   const [isPending, startTransition] = useTransition();
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
      append({ name: '' });
   };

   //Todo: Handle submitting the form
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      startTransition(async () => {
         try {
            const res = await createCategory(data);
            if (res.status === 'success') {
               toast({
                  title: 'Created: Category',
                  description: `${res.category.name} has been created.`,
               });

               router.push('/dashboard/inventory/categories');
               setClose();
            }
         } catch (error) {
            console.log(error);
            toast({
               title: 'Error',
               description: 'Failed to create category.',
            });
         }
      });
   };

   return (
      <div className='flex flex-col'>
         <div className='sticky top-0 z-50 flex items-center justify-between p-6 bg-white'>
            <Button variant={'secondary'} onClick={() => setClose()}>
               <X size={20} />
            </Button>

            <h1 className='text-xl font-medium'>Create Category</h1>
            <Button type='submit' onClick={handleSubmit(onSubmit)}>
               {isPending ? (
                  <>
                     <CircleDashedIcon size={20} className='animate-spin' />
                  </>
               ) : (
                  'Save'
               )}
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
                     {...register('name', { required: true })}
                  />
                  {errors.name && (
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
                        {...register(`subCategories.${index}.name`)}
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

export default CreateCategoryForm;
