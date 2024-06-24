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
import { createModel } from '@/lib/db/modelCrud';

const schema = z.object({
   modelName: z.string().min(1, 'model name is required'),
   modelImage: z
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

const AddModel = ({ seriesId }: { seriesId: number }) => {
   const inputFileRef = useRef<HTMLInputElement>(null);
   const [loading, setLoading] = useState(false);

   const methods = useForm<FormData>({
      resolver: zodResolver(schema),
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
         const file = formData.modelImage?.[0];

         if (!file) {
            await createModel({
               series_id: seriesId,
               model_name: formData.modelName,
               model_image: '/lml_logo.png',
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

         await createModel({
            series_id: seriesId,
            model_name: formData.modelName,
            model_image: imageUrl,
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
            <Button variant='default'>Add new</Button>
         </DialogTrigger>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Add Model</DialogTitle>
            </DialogHeader>

            <Form {...methods}>
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='grid gap-4 py-4'
               >
                  <FormField
                     control={control}
                     name='modelName'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>model Name</FormLabel>
                           <FormControl>
                              <Input placeholder='model Name' {...field} />
                           </FormControl>
                           {errors.modelName && (
                              <p>{errors.modelName.message}</p>
                           )}
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={control}
                     name='modelImage'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel
                              htmlFor='modelImage'
                              className='text-right mb-2'
                           >
                              Image
                           </FormLabel>
                           <FormControl>
                              <Input
                                 type='file'
                                 accept='image/*'
                                 ref={inputFileRef}
                                 id='modelImage'
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

export default AddModel;
