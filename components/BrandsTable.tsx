'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import AddService from './AddService';
import CustomContainer from './CustomContainer';
import { Card } from './ui/card';
import { Input } from './ui/input';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from './ui/table';
import Link from 'next/link';

function BrandsTable({ brands }: any) {
   return (
      <CustomContainer>
         <h1 className='text-3xl px-2 mb-4'>Services</h1>
         <Card className='mb-4'>
            <div className='flex justify-between items-center gap-5 px-3 py-6'>
               <div className='flex items-center border border-primary-foreground px-3 rounded-md '>
                  <Search />
                  <Input
                     placeholder='Search brands'
                     className='lg:w-96 border-none focus-visible:outline-none '
                  />
               </div>
               <AddService />
            </div>
         </Card>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead className='w-72'>Brand Name</TableHead>
                  <TableHead>Brand Image</TableHead>
                  <TableHead className='w-80'>Brand Description</TableHead>
                  <TableHead>Action</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {brands?.map((brand: any) => (
                  <TableRow>
                     <Link href={`/dashboard/brands/${brand?.brand_id}/series`}>
                        <TableCell>{brand.brand_name}</TableCell>
                     </Link>
                     <TableCell>
                        <Image
                           src={'/lml_logo.png'}
                           alt={brand.name}
                           width={50}
                           height={50}
                           className='rounded-md object-cover'
                        />
                     </TableCell>
                     <TableCell>{brand.brand_desc}</TableCell>
                     <TableCell>Edit</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </CustomContainer>
   );
}

export default BrandsTable;
