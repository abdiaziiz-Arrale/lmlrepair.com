'use client';

import { Button } from '@/components/ui/button';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from './ui/table';
import { useState } from 'react';

type VariationTableProps = {
   variationData: any[];
   getVariations: (variations: any[]) => void;
   handleDeleteVariation: (index: number) => void;
};

const VariationTable = ({
   variationData,
   getVariations,
   handleDeleteVariation,
}: VariationTableProps) => {
   const [updatedVariations, setUpdatedVariations] = useState<any[]>([]);

   return (
      <Table>
         <TableHeader>
            <TableHead>Name</TableHead>
            <TableHead>Sku</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
         </TableHeader>
         <TableBody>
            {variationData.map((variation, index) => (
               <TableRow key={index}>
                  <TableCell>{variation.name}</TableCell>
                  <TableCell>{variation.sku}</TableCell>
                  <TableCell>{variation.price}</TableCell>
                  <td>
                     <Button
                        variant='ghost'
                        type='button'
                        onClick={() => handleDeleteVariation(index)}
                     >
                        Delete
                     </Button>
                  </td>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   );
};

export default VariationTable;
