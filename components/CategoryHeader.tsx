import { Plus } from 'lucide-react';
import { DatePickerDemo } from './DatePicker';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Download } from 'lucide-react';
function InventoryItemsHeader() {
   return (
      <div className='space-y-3'>
         <div className='flex items-center justify-between'>
            <div className='space-y-1'>
               <h1 className='text-2xl font-medium'>Item Categories</h1>
               <p className='text-sm'>Manage your item categories</p>
            </div>
            <div className='flex items-center gap-3'>
               <div className='flex items-center gap-3'>
                  <DatePickerDemo />
               </div>
               <Button className='space-x-2'>
                  <Plus size={20} />
                  <span>Add Category</span>
               </Button>
            </div>
         </div>

         <Input placeholder='Search Category. . . . .' className='max-w-96 ' />
      </div>
   );
}

export default InventoryItemsHeader;
