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
               <h1 className='text-2xl font-medium'>Inventory Items</h1>
               <p className='text-sm'>Manage your inventory items</p>
            </div>
            <Button className='space-x-2'>
               <Plus size={20} />
               <span>Add Item</span>
            </Button>
         </div>
         <div className='flex items-center justify-between space-x-3'>
            <Input placeholder='Search Item...' className='max-w-96 ' />
            <div className='flex items-center gap-3'>
               <DatePickerDemo />
               <Button className='space-x-2 w-32'>
                  <Download size={20} />
                  <span>Export</span>
               </Button>
            </div>
         </div>
      </div>
   );
}

export default InventoryItemsHeader;
