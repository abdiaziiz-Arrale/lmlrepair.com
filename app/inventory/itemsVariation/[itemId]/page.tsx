import { fetchOneItem } from '@/lib/FetchOneItem';
import ItemsVariationList from './FetchOneVariation';

type paramsProps = {
   params: {
      itemId: string;
   };
};

async function FetchOneItem({ params }: paramsProps) {
   const { item, error } = await fetchOneItem(Number(params.itemId));

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
