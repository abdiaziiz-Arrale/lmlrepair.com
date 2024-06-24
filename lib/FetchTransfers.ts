import { getInternalTransfers } from '@/lib/db/internalTransfersCrud';

export async function fetchInternalTransfers() {
   try {
      const transfers = await getInternalTransfers();
      return { transfers, error: null };
   } catch (err) {
      return { transfers: [], error: 'Check your internet connection.' };
   }
}
