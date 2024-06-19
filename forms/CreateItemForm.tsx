'use client';

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTrigger,
} from '@/components/TopDialog';
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
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { useModal } from '@/providers/model-provider';
import { ItemsCategory, ItemsSubCategory, Location } from '@prisma/client';
import { CircleDashedIcon, ShieldQuestion, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '../components/ui/use-toast';
import VariationTable from '../components/VariationsTable';
import VariationsDialog from '@/components/VariatinosDialog';

type Inputs = {
   item: string;
   description: string;
   vendor: string;
   rawCost: number;
   taxRate: number;
   shippingCost: number;
   category: string;
   subCategory: string;
   location: string;
   brand: string;
};

type CreateNewItemProps = {
   categories: ItemsCategory[];
   subCategories: ItemsSubCategory[];
   locations: Location[];
};

type Variation = {
   name: string;
   value: string;
};

function CreateNewItemForm({
   categories,
   subCategories,
   locations,
}: CreateNewItemProps) {
   const [variationsData, setVariationsData] = useState<any>([]);
   const router = useRouter();
   const { toast } = useToast();
   const [isPending, startTransition] = useTransition();
   const { setClose } = useModal();

   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<Inputs>();

   const handleOptionsData = (options: any) => {
      setVariationsData(options);
   };

   const handleDeleteVariation = (deleteIndex: any) => {
      const updatedVariations = variationsData?.filter((_: any, index: any) => {
         return index !== deleteIndex;
      });

      setVariationsData(updatedVariations);
   };

   console.log(variationsData);
   const onSubmit: SubmitHandler<Inputs> = (data) => {};

   return (
      <div className='flex flex-col'>
         <div className='flex items-center justify-between p-6 bg-white '>
            <Button variant={'secondary'} onClick={() => setClose()}>
               <X size={20} />
            </Button>

            <h1 className='text-xl font-medium'>Create Item</h1>
            <Button type='submit' onClick={handleSubmit(onSubmit)}>
               {isPending ? (
                  <>
                     <CircleDashedIcon size={20} className='animate-spin' />
                  </>
               ) : (
                  'Save'
               )}
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
                  <Label className='block mb-1'>Description</Label>
                  <Textarea
                     rows={6}
                     placeholder='e.g This Iphone 12 is the latest model from Apple.'
                     className='w-full'
                     {...register('description', { required: true })}
                  />
                  {errors.item && (
                     <span className='text-red-500'>
                        This field is required
                     </span>
                  )}
               </div>
               <div>
                  <ImageField />
               </div>

               <div className='flex flex-col justify-start'>
                  <div className='flex items-center justify-between'>
                     <Label className='font-medium text-lg'>Variations</Label>
                     <div className='flex items-center gap-4'>
                        <TooltipProvider>
                           <Tooltip>
                              <TooltipTrigger type='button'>
                                 <ShieldQuestion size={20} />
                              </TooltipTrigger>
                              <TooltipContent>
                                 <p>
                                    Add variations such as size, color, or
                                    material to create variations
                                 </p>
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>

                        <VariationsDialog getVariations={handleOptionsData} />
                     </div>
                  </div>
                  {variationsData.length > 0 && (
                     <VariationTable
                        variationData={variationsData}
                        getVariations={handleOptionsData}
                        handleDeleteVariation={handleDeleteVariation}
                     />
                  )}
               </div>

               <div>
                  <Label className='block mb-1'>Vendor</Label>
                  <Input
                     placeholder='e.g Apple Store'
                     className='w-full'
                     {...register('vendor', { required: true })}
                  />
                  {errors.vendor && (
                     <span className='text-red-500'>
                        This field is required
                     </span>
                  )}
               </div>

               <div>
                  <Label className='block mb-1'>Brand</Label>
                  <Input
                     placeholder='e.g Apple'
                     className='w-full'
                     {...register('brand', { required: true })}
                  />
                  {errors.brand && (
                     <span className='text-red-500'>
                        This field is required
                     </span>
                  )}
               </div>

               <div>
                  <Label className='block mb-1'>Category</Label>
                  <Controller
                     name='category'
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                           <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select a category' />
                           </SelectTrigger>
                           <SelectContent>
                              {categories.map((category) => (
                                 <SelectItem
                                    key={category.itemsCategoryId}
                                    value={String(category.itemsCategoryId)}
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

               <div>
                  <Label className='block mb-1'>Sub-Category</Label>
                  <Controller
                     name='subCategory'
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                           <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select a sub-category' />
                           </SelectTrigger>
                           <SelectContent>
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

               <div>
                  <Label className='block mb-1'>Location</Label>
                  <Controller
                     name='location'
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select onValueChange={field.onChange}>
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
                  {errors.location && (
                     <span className='text-red-500'>
                        This field is required
                     </span>
                  )}
               </div>

               <div>
                  <Label className='block mb-1'>Raw</Label>
                  <Input
                     type='number'
                     step='0.01'
                     placeholder='e.g 1000.00'
                     className='w-full'
                     {...register('rawCost', { required: true })}
                  />
                  {errors.rawCost && (
                     <span className='text-red-500'>
                        This field is required
                     </span>
                  )}
               </div>

               <div>
                  <Label className='block mb-1'>Tax</Label>
                  <Input
                     type='number'
                     step='0.01'
                     placeholder='e.g 7.25'
                     className='w-full'
                     {...register('taxRate', { required: true })}
                  />
                  {errors.taxRate && (
                     <span className='text-red-500'>
                        This field is required
                     </span>
                  )}
               </div>

               <div>
                  <Label className='block mb-1'>Shipping</Label>
                  <Input
                     type='number'
                     step='0.01'
                     placeholder='e.g 25.00'
                     className='w-full'
                     {...register('shippingCost', { required: true })}
                  />
                  {errors.shippingCost && (
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

export function ImageField() {
   const handleDragOver = (e: any) => {
      e.preventDefault();
   };
   const handleDrop = (e: any) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
   };
   return (
      <div
         className='border-2 border-dashed border-gray-300 p-4 rounded-md flex items-center justify-center space-x-2'
         onDragOver={handleDragOver}
         onDrop={handleDrop}
      >
         <ImageIcon className='h-6 w-6 text-gray-600' />
         <span className='text-gray-600'>
            Drag and drop images here,{' '}
            <Label
               htmlFor='file-upload'
               className='text-blue-600 underline cursor-pointer'
            >
               upload
               <Input
                  id='file-upload'
                  type='file'
                  accept='image/*'
                  className='hidden'
               />
            </Label>
         </span>
      </div>
   );
}

function ImageIcon(props: any) {
   return (
      <svg
         {...props}
         xmlns='http://www.w3.org/2000/svg'
         width='24'
         height='24'
         viewBox='0 0 24 24'
         fill='none'
         stroke='currentColor'
         strokeWidth='2'
         strokeLinecap='round'
         strokeLinejoin='round'
      >
         <rect width='18' height='18' x='3' y='3' rx='2' ry='2' />
         <circle cx='9' cy='9' r='2' />
         <path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' />
      </svg>
   );
}
export default CreateNewItemForm;
