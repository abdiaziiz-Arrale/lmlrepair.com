'use client';

import { Card } from '@/components/ui/card';
import {
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Link, Table } from 'lucide-react';
import Image from 'next/image';

interface Services {
   data: {
      _id: number;
      typeOfRepair: string;
      Raw: number;
      Tax: number;
      Shipping: number;
      Labour: number;
      TimeFrame: string;
      Total: number;
   };
}

function CategoriesTable({ data }: Services) {
   return (
      <Card>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead className='w-72'>Name</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead className='w-80'>Description</TableHead>
                  <TableHead>Type</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data?.map((sr) => (
                  <TableRow>
                     <TableCell className='font-medium w-72 hover:underline hover:text-blue-500'>
                        <Link href={`/dashboard/services/general/${sr?._id}`}>
                           {sr.serviceName}
                        </Link>
                     </TableCell>
                     <TableCell className='font-medium'>
                        <Image
                           src={sr.serviceImage}
                           width={50}
                           height={50}
                           alt='service_image'
                        />
                     </TableCell>
                     <TableCell className='font-medium w-80 '>
                        {sr.serviceDesc}
                     </TableCell>
                     <TableCell className='font-medium'>{sr.type}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </Card>
   );
}

export default CategoriesTable;
