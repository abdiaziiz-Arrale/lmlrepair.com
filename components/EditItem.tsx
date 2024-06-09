'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { updateInventoryItem } from '@/lib/db/InventoryItemCrud';
import { ItemsCategory, ItemsSubCategory, Location } from '@prisma/client';
import { CircleDashedIcon, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from './ui/use-toast';

type Inputs = {
   item: string;
   description: string;
   sku: string;
   variations: string;
   vendor: string;
   stock: string;
   rawCost: string;
   taxRate: string;
   shippingCost: string;
   category: string;
   subCategory: string;
   location: string;
};

type EditItemProps = {
   categories: ItemsCategory[];
   subCategories: ItemsSubCategory[];
   locations: Location[];
};

function EditItem({ categories, subCategories, locations }: EditItemProps) {
   const { itemId } = useParams();
   const [isPending, startTransition] = useTransition();
   const { toast } = useToast();
   const router = useRouter();

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
            const res = await updateInventoryItem(itemId as string, {
               name: data.item,
               description: data.description,
               sku: data.sku,
               variations: data.variations,
               vendor: data.vendor,
               stock: data.stock,
               rawCost: data.rawCost,
               taxRate: data.taxRate,
               shippingCost: data.shippingCost,
               category: data.category,
               subCategory: data.subCategory,
               location: data.location,
            });

            if (res.status === 'success') {
               toast({
                  title: 'Item updated successfully',
                  description: 'The item has been updated successfully',
               });

               router.push('/dashboard/inventory/items');
            }
         } catch (error) {
            console.log(error);
            toast({
               title: 'Error updating item',
               description: 'An error occurred while updating the item',
            });
         }
      });
   };

   return (
      <div className='flex flex-col items-center justify-center min-h-screen  p-6'>
         <div className='w-full max-w-4xl bg-white p-8'>
            <div className='flex items-start justify-between border-b pb-4'>
               <Button variant={'ghost'}>
                  <X size={20} />
               </Button>
               <h1 className='text-2xl font-semibold'>Edit Item</h1>
               <Button
                  className='bg-blue-500 text-white'
                  onClick={handleSubmit(onSubmit)}
               >
                  {isPending ? (
                     <>
                        <CircleDashedIcon size={20} className='animate-spin' />
                     </>
                  ) : (
                     'Edit'
                  )}
               </Button>
            </div>
            <div className='mt-6'>
               <h2 className='mb-4 text-xl font-semibold'>Details</h2>
               <div className='grid grid-cols-2 gap-8'>
                  <div className='space-y-4'>
                     <Input placeholder='e.g iPhone 12' {...register('item')} />
                     <Textarea
                        placeholder='e.g This iPhone 12 is the latest model from Apple.'
                        className='min-h-[100px]'
                        {...register('description')}
                     />
                     <Input placeholder='SKU...' {...register('sku')} />
                     <Input
                        placeholder='Variations...'
                        {...register('variations')}
                     />
                     <Input placeholder='Vendor...' {...register('vendor')} />
                     <Input placeholder='Stock...' {...register('stock')} />
                  </div>
                  <div className='space-y-4'>
                     <Input placeholder='Raw...' {...register('rawCost')} />
                     <Input placeholder='Tax...' {...register('taxRate')} />
                     <Input
                        placeholder='Shipping...'
                        {...register('shippingCost')}
                     />

                     <div>
                        <Label className='font-semibold'>Categories</Label>
                        <Controller
                           name='category'
                           control={control}
                           render={({ field }) => (
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select a category' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectGroup>
                                       {categories.map((category) => (
                                          <SelectItem
                                             key={category.itemsCategoryId}
                                             value={String(
                                                category.itemsCategoryId
                                             )}
                                          >
                                             {category.name}
                                          </SelectItem>
                                       ))}
                                    </SelectGroup>
                                 </SelectContent>
                              </Select>
                           )}
                        />
                     </div>
                     <div>
                        <Label className='font-semibold'>Sub Categories</Label>
                        <Controller
                           name='subCategory'
                           control={control}
                           render={({ field }) => (
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select a sub category' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectGroup>
                                       {subCategories.map((subCategory) => (
                                          <SelectItem
                                             key={
                                                subCategory.itemsSubCategoryId
                                             }
                                             value={String(
                                                subCategory.itemsSubCategoryId
                                             )}
                                          >
                                             {subCategory.name}
                                          </SelectItem>
                                       ))}
                                    </SelectGroup>
                                 </SelectContent>
                              </Select>
                           )}
                        />
                     </div>
                     <div>
                        <Label className='font-semibold'>Location</Label>
                        <Controller
                           name='location'
                           control={control}
                           render={({ field }) => (
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value}
                              >
                                 <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select a location' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectGroup>
                                       {locations.map((location) => (
                                          <SelectItem
                                             key={location.locationId}
                                             value={String(location.locationId)}
                                          >
                                             {location.name}
                                          </SelectItem>
                                       ))}
                                    </SelectGroup>
                                 </SelectContent>
                              </Select>
                           )}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditItem;
