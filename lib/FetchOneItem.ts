import { getInventoryItemById } from '@/lib/db/InventoryItemCrud';

export async function fetchOneItem(itemId: number) {
   try {
      const item = await getInventoryItemById(itemId);
      return { item, error: null };
   } catch (err) {
      return { item: [], error: 'Check your internet connection.' };
   }
}
