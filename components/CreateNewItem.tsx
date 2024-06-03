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
import { ItemsCategory, ItemsSubCategory, Location } from '@prisma/client';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
   item: string;
   sku: string;
   variations: string;
   vendor: string;
   stock: number;
   cost: number;
   category: string;
   subCategory: string;
   location: string;
};

type CreateNewItemProps = {
   categories: ItemsCategory[];
   subCategories: ItemsSubCategory[];
   locations: Location[];
};

function CreateNewItem({
   categories,
   subCategories,
   locations,
}: CreateNewItemProps) {
   //Todo: Form hook for handling form inputs
   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<Inputs>();

   //Todo: Handle form submission
   const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

   return (
      <div className='flex flex-col'>
         <div className='flex items-center justify-between p-6 bg-white '>
            <Link href={'/dashboard/inventory/items'}>
               <Button variant={'secondary'}>
                  <X size={20} />
               </Button>
            </Link>
            <h1 className='text-xl font-medium'>Create Item</h1>
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
                  <Label className='block mb-1'>Item</Label>
                  <Input
                     placeholder='e.g Iphone 12'
                     className='w-full'
                     {...register('item', { required: true })}
                  />
                  {errors.item && (
                     <span className='text-red-500'>
                        This field is required
                     </span>
                  )}
               </div>
               <div>
                  <Label className='block mb-1'>SKU</Label>
                  <Input
                     placeholder='SKU...'
                     className='w-full'
                     {...register('sku')}
                  />
               </div>
               <div>
                  <Label className='block mb-1'>Variations</Label>
                  <Input
                     placeholder='Variations....'
                     className='w-full'
                     {...register('variations')}
                  />
               </div>
               <div>
                  <Label className='block mb-1'>Vendor</Label>
                  <Input
                     placeholder='Vendor....'
                     className='w-full'
                     {...register('vendor', { required: true })}
                  />
                  {errors.vendor && (
                     <span className='text-red-500'>
                        This field is required
                     </span>
                  )}
               </div>

               <div className='flex items-center  justify-between'>
                  <div>
                     <Label className='block mb-1'>Stock</Label>
                     <Input
                        placeholder='e.g 20'
                        className='w-full'
                        {...register('stock', { required: true })}
                     />
                     {errors.stock && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
                  <div>
                     <Label className='block mb-1 text-right'>Cost</Label>
                     <Input
                        placeholder='e.g $10'
                        className='w-full'
                        {...register('cost', { required: true })}
                     />
                     {errors.cost && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
               </div>

               <div className='flex items-center justify-between gap-6'>
                  <div className='w-screen'>
                     <Label className='block mb-1'>Categories</Label>
                     <Controller
                        control={control}
                        name='category'
                        rules={{ required: true }}
                        render={({ field }) => (
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger className='w-full'>
                                 <SelectValue placeholder='Select a Category' />
                              </SelectTrigger>
                              <SelectContent>
                                 {categories.map((category) => (
                                    <SelectItem
                                       key={category.itemsCategoryId}
                                       value={category.name}
                                    >
                                       {category.name}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        )}
                     />
                     {errors.category && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
                  <div className='w-screen'>
                     <Label className='block mb-1 text-right'>
                        Sub Categories
                     </Label>
                     <Controller
                        control={control}
                        name='subCategory'
                        rules={{ required: true }}
                        render={({ field }) => (
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger className='w-full'>
                                 <SelectValue placeholder='Select a sub category' />
                              </SelectTrigger>
                              <SelectContent>
                                 {subCategories.map((subCategory, index) => (
                                    <SelectItem
                                       key={subCategory.itemsSubCategoryId}
                                       value={subCategory.name}
                                    >
                                       {subCategory.name}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        )}
                     />
                     {errors.subCategory && (
                        <span className='text-red-500'>
                           This field is required
                        </span>
                     )}
                  </div>
               </div>

               <div>
                  <Label className='block mb-1'>Locations</Label>
                  <Controller
                     control={control}
                     name='location'
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
                                    value={location.name}
                                 >
                                    {location.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     )}
                  />
                  {errors.location && (
                     <span className='text-red-500'>
                        This field is required
                     </span>
                  )}
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreateNewItem;
