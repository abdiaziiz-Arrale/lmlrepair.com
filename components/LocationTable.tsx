'use client';
import { getLocations } from '@/lib/db/ItemLocationCrud';
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

type Locations = {
   locationId: number;
   name: string;
   description?: string | null;
};

function CategoryTable() {
   const [locations, setLocations] = useState<Locations[] | undefined>(
      undefined
   );
   const [isPending, startTransition] = useTransition();

   useEffect(() => {
      function fetchInventoryItems() {
         startTransition(async () => {
            try {
               const locationsList = await getLocations();
               setLocations(locationsList);
               console.log(locationsList);
            } catch (error) {
               console.error('Error fetching  locations:', error);
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
                     <TableHead className='lg:w-80'>Location</TableHead>
                     <TableHead>Description</TableHead>
                     <TableHead>Date Added</TableHead>
                     <TableHead>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {locations &&
                     locations.map((locate) => (
                        <TableRow key={locate.locationId}>
                           <TableCell className='lg;w-96'>
                              {locate.name}
                           </TableCell>
                           <TableCell className='space-x-1 text-green-500 font-medium'>
                              {locate.description}
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
