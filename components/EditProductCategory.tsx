'use client';
import React, { useRef, useState } from 'react';
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/TopDialog';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import type { PutBlobResult } from '@vercel/blob';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
   Form,
   FormField,
   FormItem,
   FormLabel,
   FormControl,
} from '@/components/ui/form';

import { updateProductCategory } from '@/lib/db/productCategoryCrud';
import { Pencil } from 'lucide-react';

const schema = z.object({
   productCategoryName: z.string().min(1, 'category name is required'),
   productCategoryDescription: z
      .string()
      .min(1, 'category description is required'),
   productCategoryImage: z
      .any()
      .optional()
      .refine(
         (files) =>
            !files ||
            (files.length > 0 &&
               ['image/jpeg', 'image/png', 'image/jpg'].includes(
                  files[0]?.type
               )),
         'Only jpg, jpeg, and png files are allowed'
      ),
});

type FormData = z.infer<typeof schema>;

const EditProductCategory = ({
   productCategoryId,
   productCategoryName,
   productCategoryDescription,
}: {
   productCategoryId: number;
   productCategoryName: string;
   productCategoryDescription: string;
}) => {
   const inputFileRef = useRef<HTMLInputElement>(null);
   const [loading, setLoading] = useState(false);

   const methods = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         productCategoryName: productCategoryName,
         productCategoryDescription: productCategoryDescription,
      },
   });

   const {
      handleSubmit,
      control,
      formState: { errors },
   } = methods;

   async function onSubmit(formData: FormData) {
      try {
         setLoading(true);
         let imageUrl: string | null = null;
         const file = formData.productCategoryImage?.[0];

         if (!file) {
            await updateProductCategory(productCategoryId, {
               product_category_name: formData.productCategoryName,
               product_category_desc: formData.productCategoryDescription,
            });
            setLoading(false);
            window.location.reload();
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

         await updateProductCategory(productCategoryId, {
            product_category_name: formData.productCategoryName,
            product_category_desc: formData.productCategoryDescription,
            product_category_image: imageUrl,
         });

         setLoading(false);
         window.location.reload();
      } catch (error) {
         console.error('An error occurred:', error);
         setLoading(false);
      }
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant='default'>
               <Pencil />
            </Button>
         </DialogTrigger>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>

            <Form {...methods}>
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='grid gap-4 py-4'
               >
                  <FormField
                     control={control}
                     name='productCategoryName'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Category Name</FormLabel>
                           <FormControl>
                              <Input placeholder='category Name' {...field} />
                           </FormControl>
                           {errors.productCategoryName && (
                              <p>{errors.productCategoryName.message}</p>
                           )}
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={control}
                     name='productCategoryDescription'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Description</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='productCategory Description'
                                 {...field}
                              />
                           </FormControl>
                           {errors.productCategoryDescription && (
                              <p>{errors.productCategoryDescription.message}</p>
                           )}
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={control}
                     name='productCategoryImage'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel
                              htmlFor='productCategoryImage'
                              className='text-right mb-2'
                           >
                              Image
                           </FormLabel>
                           <FormControl>
                              <Input
                                 type='file'
                                 accept='image/*'
                                 ref={inputFileRef}
                                 id='productCategoryImage'
                                 className='col-span-3'
                                 onChange={(e) =>
                                    field.onChange(e.target.files)
                                 }
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />

                  <DialogFooter>
                     <Button type='submit' disabled={loading} variant='default'>
                        {loading ? 'Loading' : 'Save'}
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default EditProductCategory;
