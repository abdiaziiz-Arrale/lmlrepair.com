import { AddReturnItemDialog } from '@/components/AddReturnItem';
import InternalTransfersTable from '@/components/InternalTransfersTable';
import { Input } from '@/components/ui/input';
import { getInternalTransfers } from '@/lib/db/internalTransfersCrud';
import { TransferItemDialog } from '@/components/AddTransferItem';

export async function fetchInternalTransfers() {
   try {
      const transfers = await getInternalTransfers();
      return { transfers, error: null };
   } catch (err) {
      return { transfers: [], error: 'Check your internet connection.' };
   }
}

async function TransfersPage() {
   const { transfers, error } = await fetchInternalTransfers();

   return (
      <div className='space-y-3'>
         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            <InternalTransfersTable transfers={transfers} />
         )}
      </div>
   );
}

export default TransfersPage;
