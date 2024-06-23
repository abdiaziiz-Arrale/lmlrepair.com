import ItemsTable from '@/components/ItemsTable';
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

async function Items() {
   const { items, error } = await fetchItems();

   return (
      <div>
         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            <ItemsTable items={items} />
         )}
      </div>
   );
}

export default Items;
