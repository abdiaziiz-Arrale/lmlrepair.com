import { Edit2, Trash } from 'lucide-react';
import Link from 'next/link';
import { Card } from './ui/card';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from './ui/table';
import { EditItemDialog } from './EditItemDialog';

interface InventoryItem {
   inventoryItemId: number;
   name: string;
   description: string | null;
   sku: string;
   stock: number;
   rawCost: number;
   shippingCost: number;
   taxRate: number;
   itemsCategoryId: number | null;
   itemsSubCategoryId: number | null;
   vendorId: number | null;
   locationId: number | null;
   itemsCategory?: { name: string };
   itemsSubCategory?: { name: string };
   location?: { name: string };
   variations?: { sku: string }[];
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
                     <TableHead>Item</TableHead>
                     <TableHead>Category</TableHead>
                     <TableHead>SKU</TableHead>
                     <TableHead>Variations</TableHead>
                     <TableHead>Stock</TableHead>
                     <TableHead>Raw</TableHead>
                     <TableHead>Tax</TableHead>
                     <TableHead>Shipping</TableHead>
                     <TableHead>Cost</TableHead>
                     <TableHead>Location</TableHead>
                     <TableHead>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {items &&
                     items.map((item) => (
                        <TableRow key={item.inventoryItemId}>
                           <TableCell>{item.name}</TableCell>

                           <TableCell className='space-x-1'>
                              <span>
                                 {item.itemsCategory?.name} -{' '}
                                 {item.itemsSubCategory?.name}
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

                           <TableCell className='text-green-500 font-semibol'>
                              ${item.rawCost}
                           </TableCell>

                           <TableCell className='text-green-500 font-semibol'>
                              {item.taxRate}%
                           </TableCell>
                           <TableCell className='text-green-500 font-semibold '>
                              ${item.shippingCost}
                           </TableCell>
                           <TableCell className='text-green-500 font-bold'>
                              $
                              {Math.round(
                                 +item.rawCost +
                                    +item.rawCost * (+item.taxRate / 100) +
                                    +item.shippingCost
                              )}
                           </TableCell>

                           <TableCell>{item.location?.name || 'N/A'}</TableCell>

                           <TableCell>
                              <div className='flex items-center gap-3'>
                                 <EditItemDialog
                                    itemId={item.inventoryItemId}
                                 />

                                 <Trash
                                    size={18}
                                    className='text-red-500 cursor-pointer'
                                 />
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
