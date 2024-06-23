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
import { getInventoryItems } from '@/lib/db/InventoryItemCrud';
import { getLocations } from '@/lib/db/ItemLocationCrud';
import {
   getInternalTransferById,
   updateInternalTransfer,
} from '@/lib/db/internalTransfersCrud'; // Make sure to implement this function
import { useModal } from '@/providers/model-provider';
import {
   InternalTransfer,
   InventoryItem,
   Location,
   Variation,
} from '@prisma/client';
import { CircleDashedIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type EditInputs = {
   inventoryItemId: string;
   quantity: number | undefined;
   status: string | undefined;
   fromLocationId: string;
   toLocationId: string;
   variationId: string;
};

type TransferIdProps = {
   transferId: number;
};

export default function EditTransferItemForm({ transferId }: TransferIdProps) {
   const { setClose } = useModal();
   const { toast } = useToast();
   const router = useRouter();
   const {
      register,
      handleSubmit,
      control,
      setError,
      setValue,
      reset,
      formState: { errors: formErrors },
   } = useForm<EditInputs>();

   const [isPending, startTransition] = useTransition();
   const [inventoryItems, setInventoryItems] = useState<any>([]);
   const [locations, setLocations] = useState<Location[]>([]);
   const [inventoryError, setInventoryError] = useState<string | null>(null);
   const [locationError, setLocationError] = useState<string | null>(null);

   const [selectedItem, setSelectedItem] = useState<any>(null);
   const [inventoryLoading, setInventoryLoading] = useState<boolean>(false);
   const [locationLoading, setLocationLoading] = useState<boolean>(false);
   const [variations, setVariations] = useState<any>([]);

   useEffect(() => {
      const fetchInventoryItems = async () => {
         try {
            setInventoryLoading(true);
            const items: InventoryItem[] = await getInventoryItems();
            setInventoryItems(items);
            setInventoryLoading(false);
         } catch (error) {
            setInventoryLoading(false);
            setInventoryError('Error fetching inventory items');
            setError('inventoryItemId', {
               type: 'manual',
               message: 'Error fetching inventory items',
            });
         }
      };

      const fetchLocations = async () => {
         try {
            setLocationLoading(true);
            const locs: Location[] = await getLocations();
            setLocations(locs);
            setLocationLoading(false);
         } catch (error) {
            setLocationLoading(false);
            setLocationError('Error fetching locations');

            setError('fromLocationId', {
               type: 'manual',
               message: 'Error fetching locations',
            });
            setError('toLocationId', {
               type: 'manual',
               message: 'Error fetching locations',
            });
         }
      };

      const fetchTransferData = async () => {
         try {
            const transfer: InternalTransfer | null =
               await getInternalTransferById(String(transferId));

            setValue('quantity', transfer?.quantity);
            setValue('fromLocationId', String(transfer?.fromLocationId!));
            setValue('toLocationId', String(transfer?.toLocationId!));
            setValue('status', transfer?.status);
            setValue('variationId', String(transfer?.variationId!));
         } catch (error) {
            toast({
               title: 'Error',
               description: 'Error fetching transfer data',
            });
         }
      };

      fetchInventoryItems();
      fetchLocations();
      fetchTransferData();
   }, [transferId, reset, toast]);

   const handleItemChange = (itemId: string) => {
      const selectedItem = inventoryItems.find(
         (item: any) => item.inventoryItemId === Number(itemId)
      );
      setSelectedItem(selectedItem || null);
      if (selectedItem) {
         setVariations(selectedItem.variations || []);
      } else {
         setVariations([]);
      }
   };

   const onSubmit: SubmitHandler<EditInputs> = (data) => {
      startTransition(async () => {
         const inventoryItemFiltered = inventoryItems.find((item: any) => {
            return item.inventoryItemId === Number(data.inventoryItemId);
         });

         const variationFiltered = inventoryItemFiltered?.variations?.find(
            (vr: any) => {
               return vr.variationId === Number(data.variationId);
            }
         );

         const inValidVariationQuantity =
            data.quantity! > variationFiltered?.quantity!;

         if (inValidVariationQuantity) {
            setError('quantity', {
               type: 'manual',
               message: `Insufficient quantity, try less you have  (${variationFiltered?.quantity}) in stock`,
            });
            return;
         }
         try {
            const res = await updateInternalTransfer(transferId, {
               inventoryItemId: Number(data.inventoryItemId),
               quantity: Number(data.quantity),
               status: data.status,
               fromLocationId: Number(data.fromLocationId),
               toLocationId: Number(data.toLocationId),
               variationId: Number(data.variationId),
            });
            if (res.status === 'success') {
               toast({
                  title: `Transfer updated successfully`,
                  description: 'Transfer has been updated successfully',
               });
               router.refresh();
               setClose();
            }
         } catch (error) {
            toast({
               title: 'Error',
               description: 'Error updating transfer',
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
               <h1 className='text-3xl font-bold'>Edit Transfer</h1>
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
                     {inventoryLoading ? (
                        <CircleDashedIcon className='animate-spin' />
                     ) : inventoryError ? (
                        <p className='text-red-500'>{inventoryError}</p>
                     ) : (
                        <Controller
                           control={control}
                           name='inventoryItemId'
                           rules={{ required: true }}
                           render={({ field }) => (
                              <Select
                                 onValueChange={(value) => {
                                    field.onChange(value);
                                    handleItemChange(value);
                                 }}
                                 value={field.value}
                              >
                                 <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select item' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {inventoryItems.map((item: any) => (
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

                  {selectedItem && variations.length > 0 && (
                     <div>
                        <Label htmlFor='variationId'>Variation</Label>
                        <Controller
                           control={control}
                           name='variationId'
                           rules={{ required: true }}
                           render={({ field }) => (
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select a variation' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {variations.map((variation: Variation) => (
                                       <SelectItem
                                          key={variation.variationId}
                                          value={String(variation.variationId)}
                                       >
                                          {variation.name}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           )}
                        />
                        {formErrors.variationId && (
                           <span className='text-red-500'>
                              This field is required
                           </span>
                        )}
                     </div>
                  )}
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
                                 <SelectValue placeholder='Select a Status' />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value='Pending'>
                                    Pending
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
                     {locationLoading ? (
                        <CircleDashedIcon className='animate-spin' />
                     ) : locationError ? (
                        <p className='text-red-500'>{locationError}</p>
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
                     {locationLoading ? (
                        <CircleDashedIcon className='animate-spin' />
                     ) : locationError ? (
                        <p className='text-red-500'>{locationError}</p>
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
