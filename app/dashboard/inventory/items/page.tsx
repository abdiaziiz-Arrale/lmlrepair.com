import { DatePickerDemo } from '@/components/DatePicker';
import ItemsTable from '@/components/ItemsTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getInventoryItems } from '@/lib/db/InventoryItemCrud';
import { Download, Plus } from 'lucide-react';
import Link from 'next/link';

export async function fetchItems() {
   try {
      const items = await getInventoryItems();
      return { items, error: null };
   } catch (err) {
      return { items: [], error: 'Check your internet connection.' };
   }
}

async function Items() {
   const { items, error } = await fetchItems();
   return (
      <div>
         <div className='space-y-3 '>
            <div className='flex items-center justify-between'>
               <div className='space-y-1'>
                  <h1 className='text-2xl font-medium'>Inventory Items</h1>
                  <p className='text-sm'>Manage your inventory items</p>
               </div>
               <Link href={'/inventory/createItem/new'}>
                  <Button className='space-x-2'>
                     <Plus size={20} />
                     <span>Add Item</span>
                  </Button>
               </Link>
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

         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            <ItemsTable items={items} />
         )}
      </div>
   );
}

export default Items;
