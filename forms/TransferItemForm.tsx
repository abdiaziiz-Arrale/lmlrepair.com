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
import { useToast } from '@/components/ui/use-toast';
import { createInternalTransfer } from '@/lib/db/internalTransfersCrud';
import { getInventoryItems } from '@/lib/db/InventoryItemCrud';
import { getLocations } from '@/lib/db/ItemLocationCrud';
// import { createInternalTransfer } from '@/lib/db/internalTransfersCrud';
import { useModal } from '@/providers/model-provider';
import { InventoryItem, Location } from '@prisma/client';
import { CircleDashedIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
   inventoryItemId: string;
   quantity: number;
   status: string;
   fromLocationId: string;
   toLocationId: string;
};

export default function CreateTransferItemForm() {
   const { setClose } = useModal();
   const { toast } = useToast();
   const router = useRouter();
   const {
      register,
      handleSubmit,
      control,
      setError,
      formState: { errors: formErrors },
   } = useForm<FormData>();

   const [isPending, startTransition] = useTransition();
   const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
   const [locations, setLocations] = useState<Location[]>([]);
   const [inventoryError, setInventoryError] = useState<string | null>(null);
   const [locationError, setLocationError] = useState<string | null>(null);

   useEffect(() => {
      const fetchInventoryItems = async () => {
         try {
            const items: InventoryItem[] = await getInventoryItems();
            setInventoryItems(items);
         } catch (error) {
            setInventoryError('Error fetching inventory items');
         }
      };

      const fetchLocations = async () => {
         try {
            const locs: Location[] = await getLocations();
            setLocations(locs);
         } catch (error) {
            setLocationError('Error fetching locations');
         }
      };

      fetchInventoryItems();
      fetchLocations();
   }, []);

   const onSubmit: SubmitHandler<FormData> = (data) => {
      const inventoryItemFiltered = inventoryItems.find((item) => {
         return item.inventoryItemId === Number(data.inventoryItemId);
      });

      const inValidQuantity =
         inventoryItemFiltered && inventoryItemFiltered?.stock < data.quantity;

      if (inValidQuantity) {
         setError('quantity', {
            type: 'manual',
            message: 'Insufficient quantity, try less',
         });
         return;
      }

      startTransition(async () => {
         try {
            const res = await createInternalTransfer({
               inventoryItemId: data.inventoryItemId,
               quantity: String(data.quantity),
               status: data.status,
               fromLocationId: data.fromLocationId,
               toLocationId: data.toLocationId,
            });

            if (res.status === 'success') {
               toast({
                  title: `Item transferred successfully`,
                  description: 'Item has been transferred successfully',
               });

               router.push('/dashboard/inventory/transfers');
               setClose();
            }
         } catch (error) {
            toast({
               title: 'Error',
               description: 'Error creating transfer',
            });
         }
      });
   };

   return (
      <div className='flex items-center justify-center'>
         <div className='w-full max-w-3xl flex flex-col gap-10'>
            <div className='flex items-center justify-between'>
               <Button variant={'ghost'} onClick={() => setClose()}>
                  <X size={20} />
               </Button>
               <h1 className='text-3xl font-bold'>Add Transfer</h1>
               <Button onClick={handleSubmit(onSubmit)}>
                  {isPending ? (
                     <CircleDashedIcon className='animate-spin' />
                  ) : (
                     'Save'
                  )}
               </Button>
            </div>
            <form
               className='grid grid-cols-2 gap-6 mt-20'
               onSubmit={handleSubmit(onSubmit)}
            >
               <div className='col-span-1 space-y-4'>
                  <div>
                     <Label htmlFor='itemId'>Item</Label>
                     {inventoryItems.length === 0 ? (
                        <CircleDashedIcon className='animate-spin' />
                     ) : (
                        <Controller
                           control={control}
                           name='inventoryItemId'
                           rules={{ required: true }}
                           render={({ field }) => (
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select an item' />
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
                     {formErrors.inventoryItemId && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
                  <div>
                     <Label htmlFor='quantity'>Quantity</Label>
                     <Input
                        id='quantity'
                        type='number'
                        placeholder='Enter quantity'
                        {...register('quantity', {
                           required: 'This field is required',
                           min: {
                              value: 0,
                              message: 'Quantity cannot be less than 0',
                           },
                        })}
                     />
                     {formErrors.quantity && (
                        <span className='text-red-500'>
                           {formErrors.quantity.message ||
                              'This field is required'}
                        </span>
                     )}
                  </div>
                  <div>
                     <Label htmlFor='quantity'>Status</Label>
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
                                 <SelectValue placeholder='Select a Status' />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value='Pending'>
                                    Pending
                                 </SelectItem>
                                 <SelectItem value='InTransit'>
                                    In-Transit
                                 </SelectItem>
                                 <SelectItem value='Completed'>
                                    Completed
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
                     <Label htmlFor='fromLocationId'>From Location</Label>
                     {locations.length === 0 ? (
                        <CircleDashedIcon className='animate-spin' />
                     ) : (
                        <Controller
                           control={control}
                           name='fromLocationId'
                           rules={{ required: true }}
                           render={({ field }) => (
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select a location' />
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
                     {formErrors.fromLocationId && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
                  <div>
                     <Label htmlFor='toLocationId'>To Location</Label>
                     {locations.length === 0 ? (
                        <CircleDashedIcon className='animate-spin' />
                     ) : (
                        <Controller
                           control={control}
                           name='toLocationId'
                           rules={{ required: true }}
                           render={({ field }) => (
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select a location' />
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
                     {formErrors.toLocationId && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}
