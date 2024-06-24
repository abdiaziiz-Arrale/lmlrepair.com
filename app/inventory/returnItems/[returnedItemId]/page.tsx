import ReturnedItemComp from '@/components/ReturnedItemComp';
import { fetchOneReturnedItem } from '@/lib/FetchOneReturnedItem';

type PageProps = {
   params: {
      returnedItemId: string;
   };
};

export default async function ReturnItemsPage({ params }: PageProps) {
   const { returnedItem, error } = await fetchOneReturnedItem(
      +params.returnedItemId
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
