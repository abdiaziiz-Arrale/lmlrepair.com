import { DatePickerDemo } from '@/components/DatePicker';
import LocationTable from '@/components/LocationTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getLocations } from '@/lib/db/ItemLocationCrud';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export async function fetchLocations() {
   try {
      const locations = await getLocations();
      return { locations, error: null };
   } catch (err) {
      return { locations: [], error: 'Check your internet connection.' };
   }
}

const Locations = async () => {
   const { locations, error } = await fetchLocations();

   return (
      <div>
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
                  <Link href={'/inventory/createLocation/new'}>
                     <Button className='space-x-2'>
                        <Plus size={20} />
                        <span>Add Location</span>
                     </Button>
                  </Link>
               </div>
            </div>

            <Input
               placeholder='Search Location. . . . .'
               className='max-w-96 '
            />
         </div>

         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            <LocationTable locations={locations} />
         )}
      </div>
   );
};

export default Locations;
