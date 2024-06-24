import LocationTable from '@/components/LocationTable';
import { fetchLocations } from '@/lib/FetchLocations';

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
