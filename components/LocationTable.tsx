'use client';

import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AddLocationDialog } from './AddLocation';
import { EditLocationDialog } from './EditLocation';
import { Card } from './ui/card';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from './ui/table';

function CategoryTable({ locations }: any) {
   const [search, setSearch] = useState('');

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setSearch(inputValue);
   };

   const filteredItems = locations.filter((location: any) => {
      return (
         search.toLowerCase() === '' ||
         location.name.toLowerCase().includes(search.toLocaleLowerCase())
      );
   });
   return (
      <div>
         <div className='space-y-3'>
            <div className='flex items-center justify-between'>
               <div className='space-y-1'>
                  <h1 className='text-2xl font-medium'>Locations</h1>
                  <p className='text-sm'>Manage your Locations</p>
               </div>
               <div className='flex items-center gap-3'>
                  <AddLocationDialog />
               </div>
            </div>

            <Input
               placeholder='Search Location. . . . .'
               className='max-w-96 '
               onChange={handleInputChange}
            />
         </div>
         <div>
            <Card className='my-8'>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead className='lg:w-80'>Location</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Items in Location</TableHead>
                        <TableHead>Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {filteredItems &&
                        filteredItems.map((locate: any) => (
                           <TableRow key={locate.locationId}>
                              <TableCell className='lg;w-96'>
                                 {locate.name}
                              </TableCell>
                              <TableCell className='space-x-1 text-green-500 font-medium'>
                                 {locate.description}
                              </TableCell>
                              <TableCell>
                                 {locate.items && locate.items.length}
                              </TableCell>
                              <TableCell>
                                 <div className='flex items-center gap-3'>
                                    <EditLocationDialog
                                       locationId={locate.locationId}
                                    />

                                    <Trash2
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
      </div>
   );
}

export default CategoryTable;
