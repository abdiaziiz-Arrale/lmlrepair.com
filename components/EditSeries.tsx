'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/TopDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PutBlobResult } from '@vercel/blob';
import { updateSeries } from '@/lib/db/seriesCrud';
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
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { getBrands } from '@/lib/db/brandCrud';
import { Brand } from '@prisma/client';
import { Pencil } from 'lucide-react';

interface EditSeriesProps {
   brandId: number;
   seriesId: number;
   seriesName: string;
   seriesDescription: string;
}

const EditSeries = ({
   brandId,
   seriesId,
   seriesName,
   seriesDescription,
}: EditSeriesProps) => {
   const inputFileRef = useRef<HTMLInputElement>(null);
   const [loading, setLoading] = useState(false);

   const [brands, setBrands] = useState<Brand[]>([]);
   const [brandsLoading, setBrandsLoading] = useState(false);
   const [error, setError] = useState<null | string>(null);

   useEffect(() => {
      const fetchBrands = async () => {
         setBrandsLoading(true);
         setError(null);
         try {
            const data = await getBrands();
            setBrands(data);
         } catch (err) {
            setError('Failed to fetch brands');
         } finally {
            setBrandsLoading(false);
         }
      };

      fetchBrands();
   }, []);

   const schema = z.object({
      seriesName: z.string().min(1, 'Series name is required'),
      seriesDescription: z.string().min(1, 'Series description is required'),
      seriesBrand: z.string().min(1, 'series Brand is required'),
      seriesImage: z
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

   const methods = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         seriesName: seriesName,
         seriesDescription: seriesDescription,
         seriesBrand: brandId.toString(),
      },
   });

   const {
      handleSubmit,
      control,
      formState: { errors },
   } = methods;

   const onSubmit = async (formData: FieldValues) => {
      try {
         setLoading(true);
         let imageUrl: string | null = null;
         const file = formData.seriesImage?.[0];

         if (!file) {
            await updateSeries(seriesId, {
               brand_id: parseInt(formData.seriesBrand),
               series_name: formData.seriesName,
               series_desc: formData.seriesDescription,
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

         await updateSeries(seriesId, {
            brand_id: parseInt(formData.brandId),
            series_name: formData.seriesName,
            series_desc: formData.seriesDescription,
            series_image: imageUrl,
         });
         setLoading(false);
         window.location.reload();
      } catch (error) {
         console.error('An error occurred:', error);
         alert('something went wrong with the server');
         window.location.reload();
         setLoading(false);
      }
   };

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant='default'>
               <Pencil />
            </Button>
         </DialogTrigger>
         <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
               <DialogTitle>Edit {seriesName}</DialogTitle>
            </DialogHeader>

            <Form {...methods}>
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='grid gap-4 py-4'
               >
                  <FormField
                     control={control}
                     name='seriesName'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Series Name</FormLabel>
                           <FormControl>
                              <Input placeholder='Series Name' {...field} />
                           </FormControl>
                           {errors.seriesName && (
                              <p>{errors.seriesName.message}</p>
                           )}
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={control}
                     name='seriesDescription'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Series Description</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder='Series Description'
                                 {...field}
                              />
                           </FormControl>
                           {errors.seriesDescription && (
                              <p>{errors.seriesDescription.message}</p>
                           )}
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={control}
                     name='seriesBrand'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Change brand</FormLabel>
                           <FormControl>
                              <Select onValueChange={field.onChange}>
                                 <SelectTrigger className='w-max'>
                                    <SelectValue placeholder='Select brand' />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectGroup>
                                       <SelectLabel>Change brand:</SelectLabel>
                                       {brandsLoading ? (
                                          <div>Loading...</div>
                                       ) : error ? (
                                          <div>Error: {error}</div>
                                       ) : (
                                          brands.map((brand) => (
                                             <SelectItem
                                                key={brand.brand_id}
                                                value={brand.brand_id.toString()}
                                             >
                                                {brand.brand_name}
                                             </SelectItem>
                                          ))
                                       )}
                                    </SelectGroup>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                           {errors.seriesBrand && (
                              <p>{errors.seriesBrand.message}</p>
                           )}
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={control}
                     name='seriesImage'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel
                              htmlFor='seriesImage'
                              className='text-right mb-2'
                           >
                              Image
                           </FormLabel>
                           <Input
                              type='file'
                              accept='image/*'
                              ref={inputFileRef}
                              id='seriesImage'
                              className='col-span-3'
                              onChange={(e) => field.onChange(e.target.files)}
                           />
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

export default EditSeries;
