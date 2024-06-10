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

function ItemReturnTable() {
   return (
      <div>
         <Card className='my-8'>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className='lg:w-80'>Returned Item</TableHead>
                     <TableHead>Returned By</TableHead>
                     <TableHead>Reason</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  <TableRow>
                     <Link href={`/inventory/returnedItems/`}>
                        <TableCell className='hover:text-blue-500 hover:underline hover:underline-offset-1'>
                           Iphone 12
                        </TableCell>
                     </Link>
                     <TableCell>Customer</TableCell>
                     <TableCell>This is Hargeisa warehouse</TableCell>
                     <TableCell>Success</TableCell>
                     <TableCell className='space-x-2'>
                        <span>Edit</span>
                        <span>Delete</span>
                     </TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </Card>
      </div>
   );
}

export default ItemReturnTable;
