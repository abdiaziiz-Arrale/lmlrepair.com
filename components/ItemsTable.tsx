import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { EditItemDialog } from './EditItemDialog';
import { Card } from './ui/card';

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from './ui/table';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from './ui/tooltip';

interface InventoryItem {
   inventoryItemId: number;
   image: string;
   name: string;
   description: string | null;
   brand: string;
   itemsCategoryId: number | null;
   itemsSubCategoryId: number | null;
   vendorId: number | null;
   variations:
      | {
           variationId: number;
           name: string;
           price: number;
           quantity: number;
           image: string | null;
           sku: string;
        }[]
      | null;
   locationId: number | null;
   itemsCategory?: { name: string };
   itemsSubCategory?: { name: string };
   location?: { name: string };
   vendor: { name: string };
}

interface Props {
   items: InventoryItem[];
}

async function ItemsTable({ items }: Props) {
   return (
      <div>
         <Card className='my-8'>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Image</TableHead>
                     <TableHead>Item</TableHead>
                     <TableHead>Category</TableHead>
                     <TableHead>Stock</TableHead>
                     <TableHead>Brand</TableHead>
                     <TableHead>Vendor</TableHead>
                     <TableHead>Price</TableHead>
                     <TableHead>Location</TableHead>
                     <TableHead>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {items &&
                     items.map((item) => (
                        <TableRow key={item.inventoryItemId}>
                           <TableCell>
                              <Image
                                 src={
                                    item.image ? item.image : '/noPicture.png'
                                 }
                                 className='rounded-lg aspect-square  hover:scale-125 tranisition-all duration-300 ease-in-out'
                                 alt='No Picture'
                                 width={50}
                                 height={50}
                              />
                           </TableCell>
                           <TableCell>{item.name}</TableCell>

                           <TableCell className='space-x-1'>
                              <>
                                 <span>{item.itemsCategory?.name} </span> -
                                 <span className='text-green-600 font-semibold'>
                                    {item.itemsSubCategory?.name}
                                 </span>
                              </>
                           </TableCell>
                           <TableCell>
                              {item.variations
                                 ?.map((vr) => vr.quantity)
                                 .reduce((a, b) => a + b, 0)}
                           </TableCell>

                           <TableCell>{item.brand}</TableCell>
                           <TableCell>{item.vendor.name}</TableCell>
                           <TableCell>
                              {item.variations && item.variations.length > 0 ? (
                                 <>
                                    <span className='text-blue-500 font-bold'>
                                       $
                                       {Math.min(
                                          ...item.variations.map(
                                             (vr) => vr.price
                                          )
                                       )}{' '}
                                    </span>
                                    -{' '}
                                    <span>
                                       $
                                       {Math.max(
                                          ...item.variations.map(
                                             (vr) => vr.price
                                          )
                                       )}
                                    </span>
                                 </>
                              ) : (
                                 'No variations'
                              )}
                           </TableCell>
                           <TableCell>{item.location?.name || 'N/A'}</TableCell>

                           <TableCell>
                              <div className='flex items-center gap-3'>
                                 <EditItemDialog
                                    itemId={item.inventoryItemId}
                                 />

                                 <TooltipProvider>
                                    <Tooltip>
                                       <TooltipTrigger>
                                          <Trash2
                                             size={18}
                                             className='text-red-600 font-bold cursor-pointer'
                                          />
                                       </TooltipTrigger>
                                       <TooltipContent className='bg-red-600 text-white'>
                                          <p>Delete</p>
                                       </TooltipContent>
                                    </Tooltip>
                                 </TooltipProvider>
                              </div>
                           </TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
         </Card>
      </div>
   );
}

export default ItemsTable;
