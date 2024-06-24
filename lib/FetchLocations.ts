import { getLocations } from '@/lib/db/ItemLocationCrud';

export async function fetchLocations() {
   try {
      const locations = await getLocations();
      return { locations, error: null };
   } catch (err) {
      return { locations: [], error: 'Check your internet connection.' };
   }
}
