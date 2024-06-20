'use client';

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { Trash2 } from 'lucide-react';
import EditVariationsDialog from '../components/EditVariationDialog';
import { useState } from 'react';
import Image from 'next/image';
import noPicture from '../public/noPicture.png';

type Variation = {
   name: string;
   price: string;
   sku: string;
   quantity: string;
   image?: File | null;
};

type VariationTableProps = {
   variationData: Variation[];
   handleDeleteVariation: (deleteIndex: number) => void;
   handleEditVariation: (editIndex: number, editedVariation: Variation) => void;
};

const VariationTable = ({
   variationData,
   handleDeleteVariation,
   handleEditVariation,
}: VariationTableProps) => {
   const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([]);

   // Function to handle image file change and update preview
   const handleImageFileChange = (file: File, index: number) => {
      const reader = new FileReader();
      reader.onload = () => {
         const newPreviews = [...imagePreviews];
         newPreviews[index] = reader.result as string;
         setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
   };

   console.log(imagePreviews);

   return (
      <Table className=' border-collapse border border-gray-300 '>
         <TableHeader>
            <TableRow>
               <TableHead>Image</TableHead>
               <TableHead>Name</TableHead>
               <TableHead>Price</TableHead>
               <TableHead>SKU</TableHead>
               <TableHead>Quantity</TableHead>
               <TableHead>Action</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {variationData.map((variation, index) => (
               <>
                  <TableRow key={index}>
                     {variation.image ? (
                        <img
                           src={
                              imagePreviews[index] ||
                              URL.createObjectURL(variation.image)
                           }
                           alt={`Preview of ${variation.name}`}
                           className={
                              index === variationData.length - 1
                                 ? 'h-12 w-12 ml-3 my-2  rounded-lg aspect-square   transition ease-in-out delay-150 hover:-translate-y-4 hover:scale-150 duration-300  hover:overflow-hidden'
                                 : 'h-12 w-12 ml-3 my-2  rounded-lg aspect-square  hover:scale-150 tranisition-all duration-300 ease-in-out'
                           }
                        />
                     ) : (
                        <Image
                           src={noPicture}
                           width={50}
                           height={50}
                           alt='no-picture'
                           className='ml-3 my-2 '
                        />
                     )}
                     <TableCell>{variation.name}</TableCell>
                     <TableCell className='text-green-500 font-bold'>
                        ${variation.price}
                     </TableCell>
                     <TableCell>{variation.sku}</TableCell>
                     <TableCell className='text-purple-500 font-bold'>
                        {variation.quantity}
                     </TableCell>
                     <TableCell className='space-x-2'>
                        <EditVariationsDialog
                           variation={variation}
                           index={index}
                           onEditVariation={handleEditVariation}
                        />
                        <TooltipProvider>
                           <Tooltip>
                              <TooltipTrigger>
                                 <Trash2
                                    size={18}
                                    className='text-red-600 font-bold cursor-pointer'
                                    onClick={() => handleDeleteVariation(index)}
                                 />
                              </TooltipTrigger>
                              <TooltipContent className='bg-red-600 text-white'>
                                 <p>Delete</p>
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>
                     </TableCell>
                  </TableRow>
               </>
            ))}
         </TableBody>
      </Table>
   );
};

export default VariationTable;
