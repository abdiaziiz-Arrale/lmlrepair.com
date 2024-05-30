'use client';

import { getInventoryItems } from '@/lib/db/InventoryItemCrud';
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

type InventoryItem = {
   inventoryItemId: number;
   name: string;
   description: string | null;
   sku: string;
   stock: number;
   cost: number;
   itemsCategoryId: number | null;
   itemsSubCategoryId: number | null;
   vendorId: number | null;
   locationId: number | null;
   itemsCategory?: { name: string };
   itemsSubCategory?: { name: string };
   vendor?: { name: string };
   variations?: { sku: string }[];
   location?: { name: string };
};

function ItemsTable() {
   const [items, setItems] = useState<InventoryItem[] | undefined>(undefined);
   const [isPending, startTransition] = useTransition();

   useEffect(() => {
      function fetchInventoryItems() {
         startTransition(async () => {
            try {
               const inventoryItems = await getInventoryItems();
               setItems(inventoryItems);
               console.log(inventoryItems);
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
                     <TableHead>Item</TableHead>
                     <TableHead>Category</TableHead>
                     <TableHead>SKU</TableHead>
                     <TableHead>Variation</TableHead>
                     <TableHead>Stock</TableHead>
                     <TableHead>Cost</TableHead>
                     <TableHead>Vendor</TableHead>
                     <TableHead>Location</TableHead>
                     <TableHead>Date</TableHead>
                     <TableHead>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {items &&
                     items.map((item) => (
                        <TableRow key={item.inventoryItemId}>
                           <TableCell>{item.name}</TableCell>
                           <TableCell className='space-x-1'>
                              <span>{item.itemsCategory?.name}</span>
                              <span>-</span>
                              <span className='space-x-1 text-green-500 font-medium'>
                                 {item.itemsSubCategory?.name || 'N/A'}
                              </span>
                           </TableCell>
                           <TableCell>{item.sku}</TableCell>
                           <TableCell className=''>
                              {item.variations && item.variations.length > 0 ? (
                                 <ul>
                                    {item.variations.map((variation, index) => (
                                       <li
                                          key={index}
                                          className='truncate hover:overflow-visible transition-all delay-75 hover:whitespace-normal'
                                       >
                                          <span className='hover:whitespace-normal tranisition-all'>
                                             {variation.sku}
                                          </span>
                                       </li>
                                    ))}
                                 </ul>
                              ) : (
                                 'No variations'
                              )}
                           </TableCell>
                           <TableCell>{item.stock}</TableCell>
                           <TableCell className='text-green-500 font-medium'>
                              ${item.cost}
                           </TableCell>
                           <TableCell>{item.vendor?.name}</TableCell>
                           <TableCell>{item.location?.name || 'N/A'}</TableCell>
                           <TableCell className='w-24'>Oct, 2024</TableCell>
                           <TableCell className='w-24'>Edit</TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
         </Card>
      </div>
   );
}

export default ItemsTable;
