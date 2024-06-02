import { Edit2, Trash } from 'lucide-react';
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

interface Props {
   locations: Locations[];
}

function CategoryTable({ locations }: Props) {
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
                           <TableCell>
                              <div className='flex items-center gap-3'>
                                 <Edit2
                                    size={20}
                                    className='text-blue-500 cursor-pointer'
                                 />

                                 <Trash
                                    size={20}
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

export default CategoryTable;
