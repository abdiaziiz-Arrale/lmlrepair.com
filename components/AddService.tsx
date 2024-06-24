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
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { createService } from '@/lib/db/serviceCrud';
import { Input } from './ui/input';
import type { PutBlobResult } from '@vercel/blob';
import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
   Form,
   FormField,
   FormItem,
   FormLabel,
   FormControl,
} from '@/components/ui/form';

const schema = z.object({
   serviceName: z.string().min(1, 'Service name is required'),
   serviceDescription: z.string().min(1, 'Service description is required'),
   serviceCategory: z.string().min(1, 'Service category is required'),
   serviceImage: z
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

const AddService = () => {
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

   async function onSubmit(formData: FieldValues) {
      try {
         setLoading(true);
         let imageUrl: string | null = null;
         const file = formData.serviceImage?.[0];

         if (!file) {
            await createService({
               service_name: formData.serviceName,
               service_desc: formData.serviceDescription,
               service_type: formData.serviceCategory,
               service_image: '/lml_logo.png',
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

         await createService({
            service_name: formData.serviceName,
            service_desc: formData.serviceDescription,
            service_type: formData.serviceCategory,
            service_image: imageUrl,
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
               <DialogTitle>Add Service</DialogTitle>
            </DialogHeader>

            <Form {...methods}>
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='grid gap-4 py-4'
               >
                  <FormField
                     control={control}
                     name='serviceName'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Service Name</FormLabel>
                           <FormControl>
                              <Input placeholder='Service Name' {...field} />
                           </FormControl>
                           {errors.serviceName && (
                              <p>{errors.serviceName.message}</p>
                           )}
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={control}
                     name='serviceDescription'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Service Description</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='Service Description'
                                 {...field}
                              />
                           </FormControl>
                           {errors.serviceDescription && (
                              <p>{errors.serviceDescription.message}</p>
                           )}
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={control}
                     name='serviceCategory'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Service Category</FormLabel>
                           <FormControl>
                              <Select onValueChange={field.onChange}>
                                 <SelectTrigger className='w-max'>
                                    <SelectValue placeholder='Select Type' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectGroup>
                                       <SelectLabel>Type:</SelectLabel>
                                       <SelectItem value='repair_service'>
                                          Repair service
                                       </SelectItem>
                                       <SelectItem value='general_service'>
                                          General services
                                       </SelectItem>
                                    </SelectGroup>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                           {errors.serviceCategory && (
                              <p>{errors.serviceCategory.message}</p>
                           )}
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={control}
                     name='serviceImage'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel
                              htmlFor='serviceImage'
                              className='text-right mb-2'
                           >
                              Image
                           </FormLabel>
                           <FormControl>
                              <Input
                                 type='file'
                                 accept='image/*'
                                 ref={inputFileRef}
                                 id='serviceImage'
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

export default AddService;
