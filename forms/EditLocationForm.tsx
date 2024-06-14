'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { updateLocation } from '@/lib/db/ItemLocationCrud';
import { useModal } from '@/providers/model-provider';
import { CircleDashedIcon, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
   name: string;
   description: string;
};

type LocationProps = {
   locationId: number;
};

export default function EditLocationForm({ locationId }: LocationProps) {
   const { setClose } = useModal();

   const router = useRouter();
   const { toast } = useToast();
   const [isPending, startTransition] = useTransition();
   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<Inputs>();

   //Todo: Handle form submission
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      startTransition(async () => {
         try {
            const res = await updateLocation(locationId, {
               name: data.name,
               description: data.description,
            });

            if (res.status === 'success') {
               toast({
                  title: 'Location updated successfully',
                  description: 'The location has been updated successfully.',
               });
               router.push('/dashboard/inventory/locations');
               setClose();
            }
         } catch (error) {
            console.log(error);
            toast({
               title: 'An error occurred',
               description: 'Failed to update the location.',
            });
         }
      });
   };

   return (
      <div className='flex h-screen'>
         <div className='m-auto  p-8 rounded-lg  w-1/2'>
            <div className='flex justify-between items-center mb-8'>
               <Button variant={'ghost'} onClick={() => setClose()}>
                  <X className='h-6 w-6' />
               </Button>

               <h1 className='text-2xl font-semibold'>Edit Location</h1>
               <Button variant='default' onClick={handleSubmit(onSubmit)}>
                  {isPending ? (
                     <>
                        <CircleDashedIcon size={20} className='animate-spin' />
                     </>
                  ) : (
                     'Edit'
                  )}
               </Button>
            </div>
            <div>
               <h2 className='text-lg font-medium mb-4'>Details</h2>
               <div className='space-y-4'>
                  <div className='flex flex-col'>
                     <Label htmlFor='location'>Location</Label>
                     <Input
                        id='location'
                        placeholder='e.g Seattle Warehouse A'
                        {...register('name')}
                     />
                  </div>
                  <div className='flex flex-col'>
                     <Label htmlFor='description'>Description</Label>
                     <Textarea
                        id='description'
                        placeholder='e.g Main warehouse for storing inventory items.'
                        className='min-h-[100px]'
                        {...register('description')}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
