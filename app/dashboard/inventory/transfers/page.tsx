import InternalTransfersTable from '@/components/InternalTransfersTable';
import { fetchInternalTransfers } from '@/lib/FetchTransfers';

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
