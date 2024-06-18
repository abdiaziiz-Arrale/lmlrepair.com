import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Edit2 } from 'lucide-react';

type OptionsProp = {
   setName: string;
   options: string[];
};

function OptionsTable({ setName, options }: OptionsProp) {
   return (
      <Table>
         <TableBody>
            <TableRow>
               <TableCell>{setName}</TableCell>
               {options.map((option, index) => (
                  <TableCell key={index}>{option}</TableCell>
               ))}
               <TableCell>
                  <Edit2 size={16} />
               </TableCell>
            </TableRow>
         </TableBody>
      </Table>
   );
}

export default OptionsTable;
