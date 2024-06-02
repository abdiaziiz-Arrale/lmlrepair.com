'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
   location: string;
   description: string;
};

function CreateNewItem() {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<Inputs>();

   const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log(data);
   };

   return (
      <div className='flex flex-col'>
         <div className='flex items-center justify-between p-6 bg-white '>
            <Link href={'/dashboard/inventory/locations'}>
               <Button variant={'secondary'}>
                  <X size={20} />
               </Button>
            </Link>
            <h1 className='text-xl font-medium'>Create Location</h1>
            <Button type='submit' onClick={handleSubmit(onSubmit)}>
               Save
            </Button>
         </div>
         <div className='flex flex-col items-center p-6 space-y-4'>
            <h1 className='font-bold text-lg'>Details</h1>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className='space-y-4 w-full max-w-lg'
            >
               <div>
                  <Label className='block mb-1'>Location</Label>
                  <Input
                     placeholder='e.g seattle Warehouse A'
                     className='w-full'
                     {...(register('location'), { required: true })}
                  />
               </div>
               <div>
                  <Label className='block mb-1'>Description</Label>
                  <Input
                     placeholder='e.g Main warehouse for storing inventory items.'
                     className='w-full'
                     {...(register('description'), { required: true })}
                  />
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreateNewItem;
