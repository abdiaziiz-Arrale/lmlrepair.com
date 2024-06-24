import { getInternalTransferById } from '@/lib/db/internalTransfersCrud';
import { InternalTransfer } from '@prisma/client';

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
