import { getInventoryItems } from '@/lib/db/InventoryItemCrud';
import { InventoryItem } from '@prisma/client';

export async function fetchItems() {
   try {
      const items: InventoryItem[] = await getInventoryItems();

      return { items, error: null };
   } catch (err) {
      return { items: [], error: 'Check your internet connection.' };
   }
}
