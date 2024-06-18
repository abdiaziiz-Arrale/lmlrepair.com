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
import { CircleDashedIcon, Plus, ShieldQuestion, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '../components/ui/use-toast';

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
};

type CreateNewItemProps = {
   categories: ItemsCategory[];
   subCategories: ItemsSubCategory[];
   locations: Location[];
};

function CreateNewItemForm({
   categories,
   subCategories,
   locations,
}: CreateNewItemProps) {
   const router = useRouter();
   const { toast } = useToast();
   const [isPending, startTransition] = useTransition();
   const { setClose } = useModal();
   const [optionsData, setOptionsData] = useState<any[]>([]);

   //Todo: Form hook for handling form inputs
   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<Inputs>();

   const handleOptionsData = (options: any[]) => {
      setOptionsData((prevOptionSets) => [
         ...prevOptionSets,
         ...options.map((option) => ({
            setName: option.setName,
            options: option.options,
         })),
      ]);
   };
   console.log(optionsData);

   //Todo: Handle form submission
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log(data.description);
      // startTransition(async () => {
      //    try {
      //       const res = await createInventoryItem({
      //          name: data.item,
      //          description: data.description,

      //          vendor: data.vendor,

      //          rawCost: data.rawCost,
      //          taxRate: data.taxRate,
      //          shippingCost: data.shippingCost,
      //          category: data.category,
      //          subCategory: data.subCategory,
      //          location: data.location,
      //       });

      //       if (res.status === 'success') {
      //          toast({
      //             title: res.status,
      //             description: `Item ${res.item.name} created successfully`,
      //          });
      //          router.push('/dashboard/inventory/items');
      //          setClose();
      //       }
      //    } catch (error) {
      //       toast({
      //          title: 'Failed to create item',
      //          description: 'An error occurred while creating the item',
      //       });
      //    }
      // });
   };

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
                     <Label className='font-medium text-lg'>Options</Label>
                     <div className='flex items-center gap-4'>
                        <TooltipProvider>
                           <Tooltip>
                              <TooltipTrigger type='button'>
                                 <ShieldQuestion size={20} />
                              </TooltipTrigger>
                              <TooltipContent>
                                 <p>
                                    Add options such as size, color, or material
                                    to create variations
                                 </p>
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>

                        <OptionsDialog getOptions={handleOptionsData} />
                     </div>
                  </div>
                  {/* {options.options.length > 0 && (
                     <OptionsTable
                        setName={options.setName}
                        options={options.options}
                     />
                  )} */}
               </div>
               <div className='mt-10'>
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

               <div>
                  <Label className='block mb-1 '>Raw</Label>
                  <Input
                     placeholder='e.g $10'
                     className='w-full'
                     {...register('rawCost', { required: true })}
                  />
                  {errors.rawCost && (
                     <span className='text-red-500'>
                        This field is required
                     </span>
                  )}
               </div>

               <div className='flex items-center  justify-between'>
                  <div>
                     <Label className='block mb-1 '>Tax</Label>
                     <Input
                        placeholder='e.g $10'
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
                     <Label className='block mb-1 text-right'>Shipping</Label>
                     <Input
                        placeholder='e.g $10'
                        className='w-full'
                        {...register('shippingCost', { required: true })}
                     />
                     {errors.shippingCost && (
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
            <label
               htmlFor='file-upload'
               className='text-blue-600 underline cursor-pointer'
            >
               upload
               <input
                  id='file-upload'
                  type='file'
                  accept='image/*'
                  className='hidden'
               />
            </label>
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

const OptionsDialog = ({
   getOptions,
}: {
   getOptions: (options: any[]) => void;
}) => {
   const [optionSets, setOptionSets] = useState<any[]>([
      { setName: '', options: [''] }, // Initial empty option set
   ]);

   // Function to handle adding a new option set
   const handleAddOptionSet = () => {
      setOptionSets([...optionSets, { setName: '', options: [''] }]);
   };

   // Function to handle setting the setName value
   const handleSetNameChange = (index: number, value: string) => {
      const newOptionSets = [...optionSets];
      newOptionSets[index].setName = value;
      setOptionSets(newOptionSets);
   };

   // Function to handle adding a new option field within a set
   const handleAddOptionField = (setIndex: number) => {
      const newOptionSets = [...optionSets];
      newOptionSets[setIndex].options.push('');
      setOptionSets(newOptionSets);
   };

   // Function to handle setting an option value within a set
   const handleOptionChange = (
      setIndex: number,
      optionIndex: number,
      value: string
   ) => {
      const newOptionSets = [...optionSets];
      newOptionSets[setIndex].options[optionIndex] = value;
      setOptionSets(newOptionSets);
   };

   // Function to handle submitting the options data to the parent component
   const handleAddOptions = () => {
      getOptions(optionSets);
   };

   // const handleAddOptions = (setName: string, options: string[]) => {

   // };

   return (
      <Dialog>
         <DialogHeader>
            <DialogTrigger>
               <Button type='button'>Add</Button>
            </DialogTrigger>
         </DialogHeader>
         <DialogContent>
            <div className='space-y-4'>
               {optionSets.map((optionSet, setIndex) => (
                  <div key={setIndex}>
                     <div>
                        <Label className='block mb-1'>Option Set Name</Label>
                        <Input
                           placeholder='Enter option set name'
                           className='w-full'
                           value={optionSet.setName}
                           onChange={(e) =>
                              handleSetNameChange(setIndex, e.target.value)
                           }
                        />
                     </div>
                     <div>
                        <Label className='block mb-1'>
                           <span>Options</span>
                           <Plus
                              size={20}
                              onClick={() => handleAddOptionField(setIndex)}
                           />
                        </Label>
                        {optionSet.options.map(
                           (option: any, optionIndex: number) => (
                              <div key={optionIndex}>
                                 <Input
                                    placeholder={`Enter Option`}
                                    className='w-full'
                                    onChange={(e) =>
                                       handleOptionChange(
                                          setIndex,
                                          optionIndex,
                                          e.target.value
                                       )
                                    }
                                 />
                              </div>
                           )
                        )}
                     </div>
                  </div>
               ))}
            </div>
            <DialogFooter>
               <DialogClose>
                  <Button type='button' onClick={handleAddOptions}>
                     Create Variation
                  </Button>
               </DialogClose>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default CreateNewItemForm;
