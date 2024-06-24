import { getReturnedItems } from '@/lib/db/returnItemCrud';

export async function fetchReturnedItems() {
   try {
      const returnedItems = await getReturnedItems();
      return { returnedItems, error: null };
   } catch (err) {
      return { returnedItems: [], error: 'Check your internet connection.' };
   }
}
