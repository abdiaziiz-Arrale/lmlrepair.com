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
import { useToast } from '@/components/ui/use-toast';
import { getInventoryItems } from '@/lib/db/InventoryItemCrud';
import { getLocations } from '@/lib/db/ItemLocationCrud';
import { createReturnedItem } from '@/lib/db/returnItemCrud';
import { useModal } from '@/providers/model-provider';
import { InventoryItem, Location } from '@prisma/client';
import { CircleDashedIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InventoryCombined } from './TransferItemForm';

type Variation = {
   variationId: number;
   name: string;
   quantity: number;
   image: string;
   sku: string;
};

type FormData = {
   reason: string;
   returningParty: 'customer' | 'shop';
   returnedAt: Date;
   variationId: string;
   request: 'refund' | 'credit';
   status: 'pending' | 'complete';
   result: 'success' | 'rejected';
   itemId: string;
   locationId: string;
   comments: string[];
};

type InventoryWithVariations = InventoryItem & { variations: Variation[] };

export default function CreateReturnItemForm() {
   const { setClose } = useModal();
   const { toast } = useToast();
   const router = useRouter();
   const {
      register,
      control,
      handleSubmit,
      formState: { errors: formErrors },
   } = useForm<FormData>();
   const [isPending, startTransition] = useTransition();
   const [inventoryItems, setInventoryItems] = useState<any>([]);
   const [locations, setLocations] = useState<Location[]>([]);
   const [selectedItem, setSelectedItem] = useState<any>(null);
   const [variations, setVariations] = useState<any>([]);
   const [inventoryLoading, setInventoryLoading] = useState<boolean>(false);
   const [inventoryError, setInventoryError] = useState<string | null>(null);
   const [locationsLoading, setLocationsLoading] = useState<boolean>(false);
   const [locationsError, setLocationsError] = useState<string | null>(null);

   useEffect(() => {
      const fetchInventoryItems = async () => {
         setInventoryLoading(true);
         try {
            const items: InventoryItem[] = await getInventoryItems();
            setInventoryItems(items);
         } catch (error) {
            setInventoryError('Error fetching inventory items');
         } finally {
            setInventoryLoading(false);
         }
      };

      const fetchLocations = async () => {
         setLocationsLoading(true);
         try {
            const locs: Location[] = await getLocations();
            setLocations(locs);
         } catch (error) {
            setLocationsError('Error fetching locations');
         } finally {
            setLocationsLoading(false);
         }
      };

      fetchInventoryItems();
      fetchLocations();
   }, []);

   const handleItemChange = (itemId: string) => {
      const selectedItem = inventoryItems.find(
         (item: InventoryCombined) => item.inventoryItemId === Number(itemId)
      );
      setSelectedItem(selectedItem || null);
      if (selectedItem) {
         setVariations(selectedItem.variations);
      } else {
         setVariations([]);
      }
   };

   const onSubmit = async (data: FormData) => {
      startTransition(async () => {
         try {
            const returnedAt = new Date(data.returnedAt);
            const res = await createReturnedItem({
               inventoryItemId: data.itemId,
               locationId: data.locationId,
               reason: data.reason,
               variationId: data.variationId,
               returningParty: data.returningParty,
               returnedAt: returnedAt,
               status: data.status,
               request: data.request,
               result: data.result,
               comments: data.comments,
            });
            if (res.status === 'success') {
               toast({
                  title: 'Item Returned',
                  description: 'The Item has been returned successfully',
               });
               router.push('/dashboard/inventory/returns');
               setClose();
            }
         } catch (error) {
            toast({
               title: 'Error',
               description: 'An error occurred while returning the item',
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
               <h1 className='text-3xl font-bold'>Add Return</h1>
               <Button onClick={handleSubmit(onSubmit)}>
                  {isPending ? (
                     <CircleDashedIcon className='animate-spin' />
                  ) : (
                     'Save'
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
                  <div>
                     <Label htmlFor='returnedAt'>Returned At</Label>
                     <Input
                        type='date'
                        {...register('returnedAt', { required: true })}
                     />
                     {formErrors.returnedAt && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
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
                                 <SelectValue placeholder='Select request' />
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
                                 <SelectValue placeholder='Select status' />
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
                     <Label htmlFor='result'>Result</Label>
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
                                 <SelectValue placeholder='Select result' />
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
                     <Label htmlFor='itemId'>Item</Label>
                     {inventoryLoading ? (
                        <CircleDashedIcon className='animate-spin' />
                     ) : inventoryError ? (
                        <p className='text-red-500'>{inventoryError}</p>
                     ) : (
                        <Controller
                           control={control}
                           name='itemId'
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
                     {formErrors.itemId && (
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
                                    {variations.map((variation: any) => (
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
                     <Label htmlFor='locationId'>Location</Label>
                     {locationsLoading ? (
                        <CircleDashedIcon className='animate-spin' />
                     ) : locationsError ? (
                        <p className='text-red-500'>{locationsError}</p>
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
                                    <SelectValue placeholder='Select location' />
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
                     <Controller
                        control={control}
                        name='comments'
                        defaultValue={[]}
                        render={({ field }) => (
                           <div className='grid gap-2'>
                              {field.value.map((comment, index) => (
                                 <Textarea
                                    key={index}
                                    rows={2}
                                    placeholder={`Enter comment ${index + 1}`}
                                    value={comment}
                                    onChange={(e) => {
                                       const newComments = [...field.value];
                                       newComments[index] = e.target.value;
                                       field.onChange(newComments);
                                    }}
                                 />
                              ))}
                              <Button
                                 type='button'
                                 variant='outline'
                                 onClick={() =>
                                    field.onChange([...field.value, ''])
                                 }
                              >
                                 Add More Comment
                              </Button>
                           </div>
                        )}
                     />
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
}
