import InternalTransferComp from '@/components/InternalTransferComp';
import { fetchOneTransferedId } from '@/lib/FetchOneTransfer';

type TransferedItemId = {
   params: {
      transferId: string;
   };
};

async function OneTransferedItem({ params }: TransferedItemId) {
   const { transferId } = params;
   const { transfer, error } = await fetchOneTransferedId(transferId);

   return (
      <div>
         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            transfer && <InternalTransferComp transfer={transfer} />
         )}
      </div>
   );
}

export default OneTransferedItem;
