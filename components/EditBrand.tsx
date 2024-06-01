'use client';
import React, { useRef, useState } from 'react';
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { PutBlobResult } from '@vercel/blob';
import { updateBrand } from '@/lib/db/brandCrud';
import { Pencil } from 'lucide-react';

interface EditBrandProps {
   brandId: number;
   brandName: string;
   brandDescription: string;
}

const EditBrand = ({ brandId,brandName,brandDescription }: EditBrandProps) => {
   const inputFileRef = useRef<HTMLInputElement>(null);

   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
      brandName: brandName,
      brandDescription: brandDescription,
   });

   const handleInputChange = (event: any) => {
      const { name, value } = event.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   async function onSubmit() {
      if (!formData.brandName || !formData.brandDescription) {
         alert('missing info');
         return 0;
      }
      try {
         setLoading(true);
         let imageUrl: string | null = null;
         if (inputFileRef.current?.files) {
            const file = inputFileRef.current.files[0];

            if (!file) {
               await updateBrand(brandId, {
                  brand_id: brandId,
                  brand_name: formData.brandName,
                  brand_desc: formData.brandDescription,
               });
      
               setLoading(false);
               window.location.reload()
               return;
             }

            const response = await fetch(`/api/upload?filename=${file.name}`, {
               method: 'POST',
               body: file,
            });

            if (!response.ok) {
               throw new Error('Failed to upload file.');
            }

            const newBlob = (await response.json()) as PutBlobResult;
            imageUrl = newBlob.url;
         } else {
            throw new Error('Please provide an image for the department.');
         }

         if (!imageUrl) {
            throw new Error('Image upload failed. Please try again.');
         }

         await updateBrand(brandId, {
            brand_id: brandId,
            brand_name: formData.brandName,
            brand_desc: formData.brandDescription,
            brand_image: imageUrl,
         });

         setLoading(false);
         window.location.reload()
      } catch (error) {
         console.error('An error occurred:', error);
         setLoading(false);
      }
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant='default'><Pencil/></Button>
         </DialogTrigger>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Add Brand</DialogTitle>
            </DialogHeader>

            <div className='grid gap-4 py-4'>
               <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='brandName' className='text-right'>
                     brand name
                  </Label>
                  <Input
                     name='brandName'
                     value={formData.brandName}
                     onChange={handleInputChange}
                     className='col-span-3'
                     placeholder='brand Name'
                  />
               </div>
               <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='brandDescription' className='text-right'>
                     Description
                  </Label>
                  <Input
                     name='brandDescription'
                     value={formData.brandDescription}
                     onChange={handleInputChange}
                     className='col-span-3'
                     placeholder='Service Description'
                  />
               </div>

               <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='serviceImage' className='text-right'>
                     Image
                  </Label>
                  <Input
                     name='serviceImage'
                     className='col-span-3'
                     type='file'
                     accept='image/*'
                     ref={inputFileRef}
                  />
               </div>
            </div>

            <DialogFooter>
               <Button
                  type='submit'
                  onClick={onSubmit}
                  disabled={loading}
                  variant='default'
               >
                  {loading ? 'Loading' : 'Save'}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default EditBrand;
