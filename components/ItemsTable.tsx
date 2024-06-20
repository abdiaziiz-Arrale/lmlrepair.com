import { Trash2 } from 'lucide-react';
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
   name: string;
   description: string | null;
   brand: string;
   itemsCategoryId: number | null;
   itemsSubCategoryId: number | null;
   vendorId: number | null;
   locationId: number | null;
   itemsCategory?: { name: string };
   itemsSubCategory?: { name: string };
   location?: { name: string };
   // variations?: { sku: string }[];
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
                     <TableHead>Brand</TableHead>
                     {/* <TableHead>Variations</TableHead> */}
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

                           {/* <TableCell className=''>
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
                           </TableCell> */}

                           <TableCell>{item.brand}</TableCell>
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
