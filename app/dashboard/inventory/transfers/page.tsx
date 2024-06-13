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
         <div className='flex items-center justify-between'>
            <div>
               <h1 className='text-2xl font-medium'>Internal Transfers List</h1>
               <p className='text-sm'>Here all Internal transfers data</p>
            </div>
            <TransferItemDialog />
         </div>
         <Input placeholder='Search Item Return...' className='max-w-96 ' />
         {error ? (
            <p className='text-red-500 text-center mt-10'>{error}</p>
         ) : (
            <InternalTransfersTable transfers={transfers} />
         )}
      </div>
   );
}

export default TransfersPage;
