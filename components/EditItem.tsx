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
import { ItemsCategory, ItemsSubCategory, Location } from '@prisma/client';
import { X } from 'lucide-react';

type Inputs = {
   item: string;
   description: string;
   sku: string;
   variations: string;
   vendor: string;
   stock: number;
   cost: number;
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
   return (
      <div className='flex flex-col items-center justify-center min-h-screen  p-6'>
         <div className='w-full max-w-4xl bg-white p-8'>
            <div className='flex items-start justify-between border-b pb-4'>
               <Button variant={'ghost'}>
                  <X size={20} />
               </Button>
               <h1 className='text-2xl font-semibold'>Edit Item</h1>
               <Button className='bg-blue-500 text-white'>Save</Button>
            </div>
            <div className='mt-6'>
               <h2 className='mb-4 text-xl font-semibold'>Details</h2>
               <div className='grid grid-cols-2 gap-8'>
                  <div className='space-y-4'>
                     <Input placeholder='e.g iPhone 12' />
                     <Textarea
                        placeholder='e.g This iPhone 12 is the latest model from Apple.'
                        className='min-h-[100px]'
                     />
                     <Input placeholder='SKU...' />
                     <Input placeholder='Variations...' />
                     <Input placeholder='Vendor...' />
                  </div>
                  <div className='space-y-4'>
                     <Input placeholder='Stock...' />
                     <Input placeholder='Cost...' />
                     <div>
                        <Label className='font-semibold'>Categories</Label>
                        <Select>
                           <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select a category' />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                                 {categories.map((category) => (
                                    <SelectItem
                                       key={category.itemsCategoryId}
                                       value={String(category.itemsCategoryId)}
                                    >
                                       {category.name}
                                    </SelectItem>
                                 ))}
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                     </div>
                     <div>
                        <Label className='font-semibold'>Sub Categories</Label>
                        <Select>
                           <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select a sub category' />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup>
                                 {subCategories.map((subCategory) => (
                                    <SelectItem
                                       key={subCategory.itemsSubCategoryId}
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
                     </div>
                     <div>
                        <Label className='font-semibold'>Location</Label>
                        <Select>
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
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditItem;
