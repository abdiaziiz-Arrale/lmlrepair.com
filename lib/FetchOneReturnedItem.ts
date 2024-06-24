import { getReturnedItemById } from '@/lib/db/returnItemCrud';
import { ItemReturnExtended } from '@/lib/type';

export async function fetchOneReturnedItem(
   id: number
): Promise<{ returnedItem: ItemReturnExtended | null; error: string | null }> {
   try {
      const returnedItem = await getReturnedItemById(id);
      return { returnedItem, error: null };
   } catch (err) {
      return { returnedItem: null, error: 'Check your internet connection.' };
   }
}
