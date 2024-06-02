'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
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

function CreateNewItem() {
   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<Inputs>();
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
                                 <SelectItem value='Parts'>Parts</SelectItem>
                                 <SelectItem value='Equipments'>
                                    Equipments
                                 </SelectItem>
                                 <SelectItem value='Accessories'>
                                    Accessories
                                 </SelectItem>
                                 <SelectItem value='Devices'>
                                    Devices
                                 </SelectItem>
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
                                 <SelectGroup>
                                    <SelectLabel className='text-lg'>
                                       Parts
                                    </SelectLabel>
                                    <SelectItem value='Screen'>
                                       Screen
                                    </SelectItem>
                                    <SelectItem value='Back Glass'>
                                       Back Glass
                                    </SelectItem>
                                    <SelectItem value='Battery'>
                                       Battery
                                    </SelectItem>
                                    <SelectItem value='Charging Port'>
                                       Charging Port
                                    </SelectItem>
                                    <SelectItem value='Back Camera'>
                                       Back Camera
                                    </SelectItem>
                                    <SelectItem value='Front Camera'>
                                       Front Camera
                                    </SelectItem>
                                    <SelectItem value='Back Camera Lens'>
                                       Back Camera Lens
                                    </SelectItem>
                                    <SelectItem value='Loudspeaker'>
                                       Loudspeaker
                                    </SelectItem>
                                    <SelectItem value='Earpiece'>
                                       Earpiece
                                    </SelectItem>
                                    <SelectItem value='Proximity Sensor'>
                                       Proximity Sensor
                                    </SelectItem>
                                    <SelectItem value='Taptic Engine'>
                                       Taptic Engine
                                    </SelectItem>
                                 </SelectGroup>
                                 <SelectGroup>
                                    <SelectLabel className='text-lg'>
                                       Equipments
                                    </SelectLabel>
                                    <SelectItem value='Tools'>Tools</SelectItem>
                                    <SelectItem value='Supplies'>
                                       Supplies
                                    </SelectItem>
                                 </SelectGroup>
                                 <SelectGroup>
                                    <SelectLabel className='text-lg'>
                                       Accessories
                                    </SelectLabel>
                                    <SelectItem value='Cases'>Cases</SelectItem>
                                    <SelectItem value='Chargers'>
                                       Chargers
                                    </SelectItem>
                                    <SelectItem value='Screen Protectors'>
                                       Screen Protectors
                                    </SelectItem>
                                 </SelectGroup>
                                 <SelectGroup>
                                    <SelectLabel className='text-lg'>
                                       Devices
                                    </SelectLabel>
                                    <SelectItem value='Phone'>Phone</SelectItem>
                                    <SelectItem value='Tablet'>
                                       Tablet
                                    </SelectItem>
                                    <SelectItem value='Laptop'>
                                       Laptop
                                    </SelectItem>
                                    <SelectItem value='Watch'>Watch</SelectItem>
                                    <SelectItem value='Computer'>
                                       Computer
                                    </SelectItem>
                                 </SelectGroup>
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
                              <SelectItem value='Warehouse A'>
                                 Warehouse A
                              </SelectItem>
                              <SelectItem value='Warehouse B'>
                                 Warehouse B
                              </SelectItem>
                              <SelectItem value='Retail Store 1'>
                                 Retail Store 1
                              </SelectItem>
                              <SelectItem value='Retail Store 2'>
                                 Retail Store 2
                              </SelectItem>
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
