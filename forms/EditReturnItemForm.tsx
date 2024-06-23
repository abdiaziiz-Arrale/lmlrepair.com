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
import VariationTable from '@/components/VariationsTable';
import {
   getReturnedItemById,
   updateReturnedItem,
} from '@/lib/db/returnItemCrud';
import { useModal } from '@/providers/model-provider';
import { InventoryItem, Location, Variation } from '@prisma/client';
import { CircleDashedIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '../components/ui/use-toast';
import { getLocations } from '@/lib/db/ItemLocationCrud';
import { PutBlobResult } from '@vercel/blob';
import { getInventoryItems } from '@/lib/db/InventoryItemCrud';
import { InventoryCombined } from './TransferItemForm';

type FormData = {
   reason: string;
   returningParty: string;
   returnedAt: Date;
   request: string;
   status: string;
   result: string;
   locationId: string;
   variationId: string;
   inventoryItemId: string;
   comments: string[];
};

type StockReturnIdProps = {
   returnItemId: number;
};

export default function EditReturnItemForm({
   returnItemId,
}: StockReturnIdProps) {
   const { setClose } = useModal();
   const router = useRouter();
   const { toast } = useToast();
   const {
      register,
      handleSubmit,
      control,
      setValue,
      reset,
      formState: { errors: formErrors },
   } = useForm<FormData>();

   const [isPending, startTransition] = useTransition();
   const [locations, setLocations] = useState<Location[]>([]);
   const [locationsLoading, setLocationsLoading] = useState<boolean>(false);
   const [locationsError, setLocationsError] = useState<string | null>(null);
   const [fetchingOne, setFetchingOne] = useState<boolean>(false);
   const [inventoryItems, setInventoryItems] = useState<any>([]);
   const [inventoryLoading, setInventoryLoading] = useState<boolean>(false);
   const [inventoryError, setInventoryError] = useState<string | null>(null);
   const [additionalComments, setAdditionalComments] = useState<string[]>([]);
   const [selectedItem, setSelectedItem] = useState<any>(null);
   const [variations, setVariations] = useState<any>([]);

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

      const fetchReturnedItem = async () => {
         try {
            setFetchingOne(true);
            const returnedItem: any = await getReturnedItemById(returnItemId);
            setValue('reason', returnedItem.reason);
            setValue('returningParty', returnedItem.returningParty);
            setValue('returnedAt', new Date(returnedItem.returnedAt));
            setValue('request', returnedItem.request);
            setValue('status', returnedItem.status);
            setValue('result', returnedItem.result);
            setValue('locationId', String(returnedItem.locationId));
            setValue('variationId', returnedItem.variationId);
            setValue('inventoryItemId', returnedItem.inventoryItemId);
            setValue(
               'comments',
               returnedItem.Comment.map((comment: any) => comment.text)
            );
         } catch (error) {
            console.log(error);
         } finally {
            setFetchingOne(false);
         }
      };

      fetchLocations();
      fetchInventoryItems();
      fetchReturnedItem();
   }, [returnItemId, reset, setValue]);

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

   const onSubmit: SubmitHandler<FormData> = (data) => {
      startTransition(async () => {
         try {
            const res = await updateReturnedItem(returnItemId, {
               reason: data.reason,
               returningParty: data.returningParty,
               returnedAt: data.returnedAt, // Use the properly formatted returnedAt
               request: data.request,
               status: data.status,
               result: data.result,
               locationId: data.locationId,
               comments: data.comments,
               variationId: data.variationId,
               inventoryItemId: data.inventoryItemId,
            });
            if (res.status === 'success') {
               toast({ title: 'Success', description: res.message });
               setClose();
               router.refresh();
            } else {
               toast({ title: 'Error', description: res.message });
            }
         } catch (error) {
            console.log(error);
            toast({
               title: 'Error',
               description: 'Failed to update returned item',
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
               <h1 className='text-3xl font-bold'>Edit Return</h1>
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
                        {...register('reason')}
                     />
                  </div>
                  <div>
                     <Label htmlFor='returning-party'>Returning Party</Label>
                     <Controller
                        control={control}
                        name='returningParty'
                        render={({ field }) => (
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger className='w-full'>
                                 <SelectValue placeholder='Select Party' />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value='Customer'>
                                    Customer
                                 </SelectItem>
                                 <SelectItem value='Shop'>Shop</SelectItem>
                              </SelectContent>
                           </Select>
                        )}
                     />
                  </div>
                  <div className='flex flex-col gap-2'>
                     <Label htmlFor='returned-at'>Returned At</Label>
                     <Input
                        placeholder='Select Date'
                        type='date'
                        {...register('returnedAt')}
                     />
                  </div>
                  <div>
                     <Label htmlFor='request'>Request</Label>
                     <Controller
                        control={control}
                        name='request'
                        render={({ field }) => (
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger className='w-full'>
                                 <SelectValue placeholder='Select a request type' />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value='Refund'>Refund</SelectItem>
                                 <SelectItem value='Credit'>Credit</SelectItem>
                              </SelectContent>
                           </Select>
                        )}
                     />
                  </div>
                  <div>
                     <Label htmlFor='status'>Status</Label>
                     <Controller
                        control={control}
                        name='status'
                        render={({ field }) => (
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger className='w-full'>
                                 <SelectValue placeholder='Select a request type' />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value='Pending'>
                                    Pending
                                 </SelectItem>
                                 <SelectItem value='Complete'>
                                    Complete
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                        )}
                     />
                  </div>
                  <div>
                     <Label htmlFor='result'>Result</Label>
                     <Controller
                        control={control}
                        name='result'
                        render={({ field }) => (
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger className='w-full'>
                                 <SelectValue placeholder='Select a request type' />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value='Success'>
                                    Success
                                 </SelectItem>
                                 <SelectItem value='Rejected'>
                                    Rejected
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                        )}
                     />
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
                     <Label htmlFor='locationId'>Locations</Label>
                     {locationsLoading ? (
                        <CircleDashedIcon className='animate-spin' />
                     ) : locationsError ? (
                        <p className='text-red-500'>{locationsError}</p>
                     ) : (
                        <Controller
                           control={control}
                           name='locationId'
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
                        <Button
                           variant='outline'
                           onClick={(e) => {
                              e.preventDefault();
                              setAdditionalComments((prevComments) => [
                                 ...prevComments,
                                 '',
                              ]);
                           }}
                        >
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
