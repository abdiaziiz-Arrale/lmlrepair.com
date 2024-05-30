import { Download, Plus } from 'lucide-react';
import { DatePickerDemo } from './DatePicker';
import { Button } from './ui/button';
import { Input } from './ui/input';

function InventoryLocationHeader() {
   return (
      <div className='space-y-3'>
         <div className='flex items-center justify-between'>
            <div className='space-y-1'>
               <h1 className='text-2xl font-medium'>Locations</h1>
               <p className='text-sm'>Manage your Locations</p>
            </div>
            <div className='flex items-center gap-3'>
               <div className='flex items-center gap-3'>
                  <DatePickerDemo />
               </div>
               <Button className='space-x-2'>
                  <Plus size={20} />
                  <span>Add Location</span>
               </Button>
            </div>
         </div>

         <Input placeholder='Search Location. . . . .' className='max-w-96 ' />
      </div>
   );
}

export default InventoryLocationHeader;
