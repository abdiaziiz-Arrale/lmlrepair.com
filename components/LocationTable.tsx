import { Trash2 } from 'lucide-react';
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

type Locations = {
   locationId: number;
   name: string;
   description?: string | null;
   items: { name: string }[];
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
                     <TableHead>Items in Location</TableHead>
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
   );
}

export default CategoryTable;
