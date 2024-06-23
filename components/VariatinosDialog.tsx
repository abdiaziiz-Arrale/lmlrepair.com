'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/TopDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { generateSKU } from '@/lib/skuGenerator'; // Adjust the import path as needed

type Variation = {
   name: string;
   price: string;
   sku: string;
   quantity: string;
   image?: File | null;
};

type ErrorVariation = {
   name?: string;
   price?: string;
   quantity?: string;
};

type VariationsDialogProps = {
   getVariations: (options: Variation[]) => void;
};

const VariationsDialog = ({ getVariations }: VariationsDialogProps) => {
   const [open, setOpen] = useState(false);
   const [variation, setVariation] = useState<Variation>({
      name: '',
      price: '',
      sku: '',
      quantity: '',
      image: null,
   });
   const [errors, setErrors] = useState<ErrorVariation>({});

   const handleChange = (key: string, value: string | number) => {
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

      getVariations([variation]);
      setOpen(false);
      setVariation({ name: '', price: '', sku: '', quantity: '', image: null });
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button type='button' onClick={() => setOpen(true)}>
               Add
            </Button>
         </DialogTrigger>
         <DialogContent>
            <form className='space-y-6'>
               <h1 className='text-xl font-bold text-center'>
                  Create Variation
               </h1>
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
                  {/* <div>
                     <Label className='mb-3'>SKU </Label>
                     <Input
                        placeholder='e.g. 12345-CLR-RED'
                        value={variation.sku}
                        onChange={(e) => handleChange('sku', e.target.value)}
                        disabled // Disable SKU input field
                     />
                  </div> */}
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
                  <VariationImageField handleImageChange={handleImageChange} />
               </div>
               <Button type='button' onClick={handleSubmit}>
                  Create Variation
               </Button>
            </form>
         </DialogContent>
      </Dialog>
   );
};

type ImageFieldProps = {
   handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
               onChange={handleImageChange}
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

export default VariationsDialog;
