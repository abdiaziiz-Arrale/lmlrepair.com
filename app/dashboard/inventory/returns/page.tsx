import ItemReturnTable from '@/components/ItemReturnTable';
import { getReturnedItems } from '@/lib/db/returnItemCrud';

export async function fetchReturnedItems() {
   try {
      const returnedItems = await getReturnedItems();
      return { returnedItems, error: null };
   } catch (err) {
      return { returnedItems: [], error: 'Check your internet connection.' };
   }
}

async function ReturnsPage() {
   const { returnedItems, error } = await fetchReturnedItems();

   return (
      <div className='space-y-3'>
         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            <ItemReturnTable returnedItems={returnedItems} />
         )}
      </div>
   );
}

export default ReturnsPage;
