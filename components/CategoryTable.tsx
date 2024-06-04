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
import Link from 'next/link';

type Categories = {
   name: string;
   itemsCategoryId: number;
   subCategories?: { name: string }[];
};

interface Props {
   categories: Categories[];
}

function CategoryTable({ categories }: Props) {
   return (
      <div>
         <Card className='my-8'>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead className='lg:w-80'>Category</TableHead>
                     <TableHead>Sub-Category</TableHead>
                     <TableHead>Date Added</TableHead>
                     <TableHead>Acttions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {categories &&
                     categories.map((cate) => (
                        <TableRow key={cate.itemsCategoryId}>
                           <TableCell className='lg;w-96'>
                              {cate.name}
                           </TableCell>
                           <TableCell className='space-x-1'>
                              <ul className='space-y-1'>
                                 {cate.subCategories &&
                                 cate.subCategories?.length > 0 ? (
                                    cate.subCategories?.map(
                                       (subCategory, index) => (
                                          <li
                                             key={index}
                                             className='text-green-500 font-medium'
                                          >
                                             {subCategory?.name},
                                          </li>
                                       )
                                    )
                                 ) : (
                                    <span>N/A</span>
                                 )}
                              </ul>
                           </TableCell>
                           <TableCell>2021-09-12</TableCell>
                           <TableCell>
                              <div className='flex items-center gap-3'>
                                 <Link
                                    href={`/inventory/editCategory/${cate.itemsCategoryId}`}
                                 >
                                    <Edit2
                                       size={20}
                                       className='text-blue-500 cursor-pointer'
                                    />
                                 </Link>

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
