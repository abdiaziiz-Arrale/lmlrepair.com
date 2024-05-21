'use client';

import Image from 'next/image';
import CustomContainer from './CustomContainer';
import { Card } from './ui/card';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from './ui/table';
import Link from 'next/link';

interface Services {
   _id: number;
   serviceImage: string;
   serviceName: string;
   serviceDesc: string;
   type: string;
}

function ServicesTable() {
   const data: Services[] = [
      {
         _id: 1,
         serviceImage: '/favicon.png',
         serviceName: 'Software',
         serviceDesc: 'This is software service',
         type: 'general_service',
      },
      {
         _id: 2,
         serviceImage: '/favicon.png',
         serviceName: 'Cleaning',
         serviceDesc: 'This is Cleaning service',
         type: 'general_service',
      },
      {
         _id: 3,
         serviceImage: '/favicon.png',
         serviceName: 'Diagnostics',
         serviceDesc: 'This is Diagnostics service',
         type: 'general_service',
      },
      {
         _id: 4,
         serviceImage: '/favicon.png',
         serviceName: 'Repairs',
         serviceDesc: 'This is Repairs service',
         type: 'repairs_service',
      },
   ];

   return (
      <CustomContainer>
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
                           <Link
                              href={`/dashboard/services/general/${sr?._id}`}
                           >
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
      </CustomContainer>
   );
}

export default ServicesTable;
