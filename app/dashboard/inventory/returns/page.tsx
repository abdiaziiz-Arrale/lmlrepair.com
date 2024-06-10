import { AddReturnItemDialog } from '@/components/AddReturnItem';
import ItemReturnTable from '@/components/ItemReturnTable';
import { Input } from '@/components/ui/input';
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
         <div className='flex items-center justify-between'>
            <div>
               <h1 className='text-2xl font-medium'>Return Items List</h1>
               <p className='text-sm'>Here all Returned Items data</p>
            </div>
            <AddReturnItemDialog />
         </div>
         <Input placeholder='Search Item Return...' className='max-w-96 ' />
         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            <ItemReturnTable returnedItems={returnedItems} />
         )}
      </div>
   );
}

export default ReturnsPage;
