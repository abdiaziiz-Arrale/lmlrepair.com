import Link from 'next/link';
import { Button } from './ui/button';

function InventoryHeader() {
   return (
      <div>
         <div className='space-y-1'>
            <h1 className='text-2xl font-medium'>Welcome Back.</h1>
            <p className='text-sm'>Here's what's in your inventory</p>
         </div>
         <div className='flex items-center gap-2 py-3'>
            <Link href={'/dashboard/inventory/items'}>
               <Button className='w-24'>Items</Button>
            </Link>

            <Link href={'/dashboard/inventory/category'}>
               <Button className='w-24'>Categories</Button>
            </Link>
            <Link href={'/dashboard/inventory/locations'}>
               <Button className='w-24'>Locations</Button>
            </Link>
         </div>
      </div>
   );
}

export default InventoryHeader;
