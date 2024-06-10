import ReturnedItemComp from '@/components/ReturnedItemComp';
import { getReturnedItemById } from '@/lib/db/returnItemCrud';
import { ItemReturnExtended } from '@/lib/type';

type PageProps = {
   params: {
      returnedItemId: string;
   };
};

export async function fetchOneReturnedItem(
   id: string
): Promise<{ returnedItem: ItemReturnExtended | null; error: string | null }> {
   try {
      const returnedItem = await getReturnedItemById(id);
      return { returnedItem, error: null };
   } catch (err) {
      return { returnedItem: null, error: 'Check your internet connection.' };
   }
}

export default async function ReturnItemsPage({ params }: PageProps) {
   const { returnedItem, error } = await fetchOneReturnedItem(
      params.returnedItemId
   );

   return (
      <div>
         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            returnedItem && <ReturnedItemComp returnedItem={returnedItem} />
         )}
      </div>
   );
}
