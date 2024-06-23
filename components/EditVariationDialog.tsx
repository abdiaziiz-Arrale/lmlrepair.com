'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/TopDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { generateSKU } from '@/lib/skuGenerator'; // Adjust the import path as needed

type Variation = {
   name: string;
   price: string;
   sku: string;
   quantity: string;
   image?: File | null | string;
};

type ErrorVariation = {
   name?: string;
   price?: string;
   quantity?: string;
};

type EditVariationsDialogProps = {
   variation: Variation;
   index: number;
   onEditVariation: (index: number, variation: Variation) => void;
};

const EditVariationsDialog = ({
   variation: initialVariation,
   index,
   onEditVariation,
}: EditVariationsDialogProps) => {
   const [open, setOpen] = useState(false);
   const [variation, setVariation] = useState<Variation>(initialVariation);
   const [errors, setErrors] = useState<ErrorVariation>({});

   const handleChange = (key: string, value: string | number | File) => {
      try {
         let updatedVariation = { ...variation, [key]: value };
         if (key === 'name') {
            updatedVariation = {
               ...updatedVariation,
               sku: generateSKU(value as string),
            };
         }
         setVariation(updatedVariation);
      } catch (error) {
         // Ignore the error
         console.error(`Error updating ${key}:`, error);
      }
   };

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
         if (e.target.files) {
            setVariation({ ...variation, image: e.target.files[0] });
         }
      } catch (error) {
         // Ignore the error
         console.error('Error updating image:', error);
      }
   };

   const handleSubmit = () => {
      if (!variation.name || !variation.price || !variation.quantity) {
         setErrors({
            name: !variation.name ? 'Please enter a name' : '',
            price: !variation.price ? 'Please enter a price' : '',
            quantity: !variation.quantity ? 'Please enter a quantity' : '',
         });
         return;
      }
      onEditVariation(index, variation);
      setOpen(false);
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger type='button'>
                  <DialogTrigger asChild type='button'>
                     <Pencil
                        size={18}
                        className='text-blue-600 font-bold cursor-pointer'
                     />
                  </DialogTrigger>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Edit</p>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <DialogContent>
            <form className='space-y-6'>
               <h1 className='text-xl font-bold text-center'>Edit Variation</h1>
               <div className='space-y-4'>
                  <div>
                     <Label className='mb-3'>
                        Variation Name{' '}
                        <span className='text-red-600 font-extrabold'>*</span>
                     </Label>
                     <Input
                        placeholder='e.g. Color'
                        value={variation.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                     />
                     <p className='text-red-600'>{errors.name}</p>
                  </div>
                  <div>
                     <Label className='mb-3'>
                        Price{' '}
                        <span className='text-red-600 font-extrabold'>*</span>
                     </Label>
                     <Input
                        placeholder='e.g. 10.00'
                        value={variation.price}
                        onChange={(e) =>
                           handleChange(
                              'price',
                              e.target.value === '' ? '' : e.target.value
                           )
                        }
                     />
                     <p className='text-red-600'>{errors.price}</p>
                  </div>

                  <div>
                     <Label className='mb-3'>
                        Quantity{' '}
                        <span className='text-red-600 font-extrabold'>*</span>
                     </Label>
                     <Input
                        placeholder='e.g. 10'
                        value={variation.quantity}
                        onChange={(e) =>
                           handleChange(
                              'quantity',
                              e.target.value === '' ? '' : e.target.value
                           )
                        }
                     />
                     <p className='text-red-600'>{errors.quantity}</p>
                  </div>
                  <VariationImageField handleImageChange={handleChange} />
               </div>
               <Button type='button' onClick={handleSubmit}>
                  Save Changes
               </Button>
            </form>
         </DialogContent>
      </Dialog>
   );
};

type ImageFieldProps = {
   handleImageChange: (key: string, value: string | number | File) => void;
};

export function VariationImageField({ handleImageChange }: ImageFieldProps) {
   return (
      <div className='border-2 border-dashed border-gray-300 p-4 rounded-md flex items-center justify-center space-x-2'>
         <ImageIcon className='h-6 w-6 text-gray-600' />
         <span> Drag and drop images here, </span>
         <Label className='text-blue-600 underline cursor-pointer'>
            upload
            <Input
               id='file-upload'
               type='file'
               accept='image/*'
               className='hidden'
               onChange={(e) => handleImageChange('image', e.target.files![0])}
            />
         </Label>
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

export default EditVariationsDialog;
