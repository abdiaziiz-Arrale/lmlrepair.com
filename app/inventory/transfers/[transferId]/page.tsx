import InternalTransferComp from '@/components/InternalTransferComp';
import { getInternalTransferById } from '@/lib/db/internalTransfersCrud';
import { InternalTransfer } from '@prisma/client';

type TransferedItemId = {
   params: {
      transferId: string;
   };
};

export async function fetchOneTransferedId(
   id: string
): Promise<{ transfer: InternalTransfer | null; error: string | null }> {
   try {
      const transfer = await getInternalTransferById(id);
      return { transfer, error: null };
   } catch (err) {
      return { transfer: null, error: 'Failed to fetch transfer details.' };
   }
}

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
