import { ItemReturn } from '@prisma/client';
import { Pencil, Trash2 } from 'lucide-react';
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

type Vendor = {
   vendorId: number;
   name: string;
};

type InventoryItem = {
   name: string;
   rawCost: number;
   taxRate: number;
   shippingCost: number;
   stock: number;
   vendor: Vendor;
};

type Location = {
   locationId: number;
   name: string;
   description: string;
};

type Comment = {
   commentId: number;
   stockReturnId: number;
   text: string;
   createdAt: Date;
};

type ItemReturnExtended = ItemReturn & {
   inventoryItem: InventoryItem;
   location: Location;
   comments: Comment[];
};

type returnedItemProps = {
   returnedItems: ItemReturnExtended[];
};

function ItemReturnTable({ returnedItems }: returnedItemProps) {
   return (
      <div>
         <Card className='my-8'>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className='lg:w-80'>Returned Item</TableHead>
                     <TableHead>Returned By</TableHead>
                     <TableHead>Reason</TableHead>
                     <TableHead>Result</TableHead>
                     <TableHead>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {returnedItems.map((item) => (
                     <TableRow key={item.stockReturnId}>
                        <TableCell className='hover:text-blue-500 hover:underline hover:underline-offset-1'>
                           <Link
                              href={`/inventory/returnItems/${item.stockReturnId}`}
                           >
                              {item.inventoryItem.name}
                           </Link>
                        </TableCell>
                        {item.returningParty === 'Customer' ? (
                           <TableCell className='text-blue-500 font-semibold'>
                              {item.returningParty}
                           </TableCell>
                        ) : (
                           <TableCell className='text-purple-700 font-semibold'>
                              {item.returningParty}
                           </TableCell>
                        )}
                        <TableCell>{item.reason}</TableCell>
                        {item.result === 'Success' ? (
                           <TableCell className='text-green-500 font-semibold'>
                              {item.result}
                           </TableCell>
                        ) : (
                           <TableCell className='text-red-500 font-semibold'>
                              {item.result}
                           </TableCell>
                        )}
                        <TableCell>
                           <div className='flex gap-2'>
                              <Link href={'/inventory/return/edit'}>
                                 <Pencil
                                    size={20}
                                    className='text-blue-600 hover:text-blue-500'
                                 />
                              </Link>

                              <Trash2 size={20} className='text-red-600' />
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

export default ItemReturnTable;
