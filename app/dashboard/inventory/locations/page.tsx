import { AddLocationDialog } from '@/components/AddLocation';
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
         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            <LocationTable locations={locations} />
         )}
      </div>
   );
};

export default Locations;
