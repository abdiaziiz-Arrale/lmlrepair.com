import ItemReturnTable from '@/components/ItemReturnTable';
import { fetchReturnedItems } from '@/lib/FetchReturns';

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
