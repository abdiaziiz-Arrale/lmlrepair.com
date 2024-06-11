'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getInventoryItems } from '@/lib/db/InventoryItemCrud';
import { getLocations } from '@/lib/db/ItemLocationCrud';
import { createReturnedItem } from '@/lib/db/returnItemCrud';
import { useModal } from '@/providers/model-provider';
import { InventoryItem, Location } from '@prisma/client';
import { CircleDashedIcon, Router, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
   reason: string;
   returningParty: 'customer' | 'shop';
   returnedAt: Date;
   request: 'refund' | 'credit';
   status: 'pending' | 'complete';
   result: 'success' | 'rejected';
   itemId: string;
   locationId: string;
   comments: string[];
};

export default function CreateReturnItemForm() {
   const { setClose } = useModal();
   const router = useRouter();
   const {
      register,
      handleSubmit,
      control,
      formState: { errors: formErrors },
   } = useForm<FormData>();

   const [isPending, startTranisition] = useTransition();

   const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
   const [inventoryLoading, setInventoryLoading] = useState<boolean>(false);
   const [inventoryError, setInventoryError] = useState<string | null>(null);

   const [locations, setLocations] = useState<Location[]>([]);
   const [locationsLoading, setLocationsLoading] = useState<boolean>(false);
   const [locationsError, setLocationsError] = useState<string | null>(null);

   const [additionalComments, setAdditionalComments] = useState<string[]>([]);

   useEffect(() => {
      const fetchInventoryItems = async () => {
         setInventoryLoading(true);
         try {
            const items: InventoryItem[] = await getInventoryItems();
            setInventoryItems(items);
         } catch (error: unknown) {
            if (error instanceof Error) {
               setInventoryError(error.message);
            } else {
               setInventoryError('An unknown error occurred');
            }
         } finally {
            setInventoryLoading(false);
         }
      };

      const fetchLocations = async () => {
         setLocationsLoading(true);
         try {
            const locs: Location[] = await getLocations();
            setLocations(locs);
         } catch (error: unknown) {
            if (error instanceof Error) {
               setLocationsError(error.message);
            } else {
               setLocationsError('An unknown error occurred');
            }
         } finally {
            setLocationsLoading(false);
         }
      };

      fetchInventoryItems();
      fetchLocations();
   }, []);

   const handleAddComment = (e: any) => {
      e.preventDefault();
      setAdditionalComments((prevComments) => [...prevComments, '']);
   };

   const onSubmit: SubmitHandler<FormData> = (data) => {
      startTranisition(async () => {
         try {
            const returnedAt = new Date(data.returnedAt);
            const res = await createReturnedItem({
               inventoryItemId: data.itemId,
               locationId: data.locationId,
               reason: data.reason,
               returningParty: data.returningParty,
               returnedAt: returnedAt,
               status: data.status,
               request: data.request,
               result: data.result,
               comments: data.comments,
            });
            if (res.status === 'success') {
               router.push('/dashboard/inventory/returns');
               setClose();
            }
         } catch (error) {
            console.log(error);
         }
      });
   };

   return (
      <div className='flex items-center justify-center  '>
         <div className='w-full max-w-3xl flex flex-col gap-10'>
            <div className='flex items-center justify-between '>
               <Button variant={'ghost'} onClick={() => setClose()}>
                  <X size={20} />
               </Button>
               <h1 className=' text-3xl font-bold '>Add Return</h1>
               <Button onClick={handleSubmit(onSubmit)}>
                  {isPending ? (
                     <CircleDashedIcon className='animate-spin' />
                  ) : (
                     'save'
                  )}
               </Button>
            </div>
            <form className='grid grid-cols-2 gap-6 mt-20'>
               <div className='col-span-1 space-y-4'>
                  <div>
                     <Label htmlFor='reason'>Reason</Label>
                     <Input
                        id='reason'
                        type='text'
                        placeholder='Enter reason'
                        {...register('reason', { required: true })}
                     />
                     {formErrors.reason && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
                  <div>
                     <Label htmlFor='returning-party'>Returning Party</Label>
                     <Controller
                        control={control}
                        name='returningParty'
                        rules={{ required: true }}
                        render={({ field }) => (
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger className='w-full'>
                                 <SelectValue placeholder='Select Party' />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value='customer'>
                                    Customer
                                 </SelectItem>
                                 <SelectItem value='shop'>Shop</SelectItem>
                              </SelectContent>
                           </Select>
                        )}
                     />
                     {formErrors.returningParty && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
                  <div className='flex flex-col gap-2'>
                     <Label htmlFor='returned-at'>Returned At</Label>
                     <Input
                        placeholder='Select Date'
                        type='date'
                        {...register('returnedAt', { required: true })}
                     />
                  </div>
                  <div>
                     <Label htmlFor='request'>Request</Label>
                     <Controller
                        control={control}
                        name='request'
                        rules={{ required: true }}
                        render={({ field }) => (
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger className='w-full'>
                                 <SelectValue placeholder='Select a request type' />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value='refund'>Refund</SelectItem>
                                 <SelectItem value='credit'>Credit</SelectItem>
                              </SelectContent>
                           </Select>
                        )}
                     />
                     {formErrors.request && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
                  <div>
                     <Label htmlFor='status'>Status</Label>
                     <Controller
                        control={control}
                        name='status'
                        rules={{ required: true }}
                        render={({ field }) => (
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger className='w-full'>
                                 <SelectValue placeholder='Select a request type' />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value='pending'>
                                    Pending
                                 </SelectItem>
                                 <SelectItem value='complete'>
                                    Complete
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                        )}
                     />
                     {formErrors.status && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
                  <div>
                     <Label htmlFor='status'>Result</Label>
                     <Controller
                        control={control}
                        name='result'
                        rules={{ required: true }}
                        render={({ field }) => (
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger className='w-full'>
                                 <SelectValue placeholder='Select a request type' />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value='success'>
                                    Success
                                 </SelectItem>
                                 <SelectItem value='rejected'>
                                    Rejected
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                        )}
                     />
                     {formErrors.result && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
               </div>
               <div className='col-span-1 space-y-4'>
                  <div>
                     <Label htmlFor='status'>Items</Label>
                     {inventoryLoading ? (
                        <CircleDashedIcon className='animate-spin' />
                     ) : inventoryError ? (
                        <p className='text-red-500 '>{inventoryError}</p>
                     ) : (
                        <Controller
                           control={control}
                           name='itemId'
                           rules={{ required: true }}
                           render={({ field }) => (
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select the item returned' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {inventoryItems.map((item) => (
                                       <SelectItem
                                          key={item.inventoryItemId}
                                          value={String(item.inventoryItemId)}
                                       >
                                          {item.name}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           )}
                        />
                     )}
                     {formErrors.itemId && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
                  <div>
                     <Label htmlFor='location'>Locations</Label>
                     {locationsLoading ? (
                        <CircleDashedIcon className='animate-spin' />
                     ) : locationsError ? (
                        <p className='text-red-500 '>{locationsError}</p>
                     ) : (
                        <Controller
                           control={control}
                           name='locationId'
                           rules={{ required: true }}
                           render={({ field }) => (
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select the location' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {locations.map((location) => (
                                       <SelectItem
                                          key={location.locationId}
                                          value={String(location.locationId)}
                                       >
                                          {location.name}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           )}
                        />
                     )}
                     {formErrors.locationId && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
                  <div>
                     <Label htmlFor='comments'>Comments</Label>
                     <div className='grid gap-2'>
                        {additionalComments.map((comment, index) => (
                           <Controller
                              key={index}
                              control={control}
                              name={`comments.${index}`}
                              defaultValue={comment}
                              render={({ field }) => (
                                 <Textarea
                                    rows={2}
                                    placeholder={`Enter comment `}
                                    value={field.value}
                                    onChange={(e) =>
                                       field.onChange(e.target.value)
                                    }
                                 />
                              )}
                           />
                        ))}

                        <Button variant='outline' onClick={handleAddComment}>
                           Add More Comment
                        </Button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}
