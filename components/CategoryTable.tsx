'use client';

import { getCategory } from '@/lib/db/ItemCategoryCrud';
import { useEffect, useState, useTransition } from 'react';
import { Card } from './ui/card';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from './ui/table';

type Categories = {
   name: string;
   itemsCategoryId: number;
   subCategories?: { name: string }[];
};

function CategoryTable() {
   const [categories, setCategories] = useState<Categories[] | undefined>(
      undefined
   );
   const [isPending, startTransition] = useTransition();

   useEffect(() => {
      function fetchInventoryItems() {
         startTransition(async () => {
            try {
               const categoryList = await getCategory();
               setCategories(categoryList);
               console.log(categoryList); // Corrected from inventoryItems
            } catch (error) {
               console.error('Error fetching inventory items:', error);
            }
         });
      }
      fetchInventoryItems();
   }, []);

   if (isPending) return <div>Loading...</div>;

   return (
      <div>
         <Card className='my-8'>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className='lg:w-80'>Category</TableHead>
                     <TableHead>Sub-Category</TableHead>
                     <TableHead>Date Added</TableHead>
                     <TableHead>Acttions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {categories &&
                     categories.map((cate) => (
                        <TableRow key={cate.itemsCategoryId}>
                           <TableCell className='lg;w-96'>
                              {cate.name}
                           </TableCell>
                           <TableCell className='space-x-1'>
                              <ul className='space-y-1'>
                                 {cate.subCategories &&
                                 cate.subCategories?.length > 0 ? (
                                    cate.subCategories?.map(
                                       (subCategory, index) => (
                                          <li
                                             key={index}
                                             className='text-green-500 font-medium'
                                          >
                                             {subCategory?.name},
                                          </li>
                                       )
                                    )
                                 ) : (
                                    <span>N/A</span>
                                 )}
                              </ul>
                           </TableCell>
                           <TableCell>2021-09-12</TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
         </Card>
      </div>
   );
}

export default CategoryTable;
