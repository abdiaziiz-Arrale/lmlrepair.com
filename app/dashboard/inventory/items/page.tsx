import ItemsTable from '@/components/ItemsTable';
import { fetchItems } from '@/lib/FetchItems';

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
