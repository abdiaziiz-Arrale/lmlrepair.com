import { getInventoryItemById } from '@/lib/db/InventoryItemCrud';
import ItemsVariationList from './FetchOneVariation';

type paramsProps = {
   params: {
      itemId: string;
   };
};

export async function fetchItems(itemId: number) {
   try {
      const item = await getInventoryItemById(itemId);
      return { item, error: null };
   } catch (err) {
      return { item: [], error: 'Check your internet connection.' };
   }
}

async function FetchOneItem({ params }: paramsProps) {
   const { item, error } = await fetchItems(Number(params.itemId));

   return (
      <div>
         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            <ItemsVariationList variations={item.variations} />
         )}
      </div>
   );
}

export default FetchOneItem;
