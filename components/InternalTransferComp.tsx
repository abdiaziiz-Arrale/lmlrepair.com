'use client';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useRouter } from 'next/navigation';

type InternalTransfer = {
   transfer: {
      internalTransferId: number;
      inventoryItemId: number;
      quantity: number;
      status: string;
      variationId: number;
      transferDate: Date;
      fromLocationId: number;
      toLocationId: number;
      fromLocation: {
         locationId: number;
         name: string;
         description: string;
      };
      toLocation: {
         locationId: number;
         name: string;
         description: string;
      };
      inventoryItem: {
         inventoryItemId: number;
         name: string;
         description: string;
         brand: string;
         image: string;
         itemsCategoryId: number;
         itemsSubCategoryId: number;
         vendorId: number;
         locationId: number;
         variations: any[]; // Adjust the type of variations based on your actual data structure
      };
   };
};

function InternalTransferComp({ transfer }: any) {
   const router = useRouter();

   return (
      <div className='container mx-auto px-4 py-8 max-w-3xl'>
         <div className='dark:bg-gray-950 rounded-lg p-6 space-y-6'>
            <div className='flex items-center justify-between'>
               <h1 className='text-2xl font-bold'>Internal Transfer Details</h1>
               <div className='flex items-center space-x-2'>
                  <Button size='sm' onClick={() => router.back()}>
                     Go Back
                  </Button>
                  <Button
                     variant='outline'
                     size='sm'
                     onClick={() => window.print()}
                  >
                     <Printer className='w-4 h-4 mr-2' />
                     Print
                  </Button>
               </div>
            </div>
            <div className='grid grid-cols-2 gap-6'>
               <div>
                  <h2 className='text-lg font-medium mb-4'>Item Information</h2>
                  <div className='space-y-6'>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Item Name:</span>
                        <span className='text-right'>
                           {transfer.inventoryItem.name}
                        </span>
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Variation:</span>
                        <span className='text-right'>
                           {transfer.inventoryItem.variations &&
                              transfer.inventoryItem.variations
                                 .filter(
                                    (vr: any) =>
                                       vr.variationId === transfer.variationId
                                 )
                                 .map((vr: any) => vr.name)}
                        </span>
                     </div>

                     <div className='flex justify-between'>
                        <span className='font-medium'>Quantity:</span>
                        <span>{transfer.quantity}</span>
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Status:</span>
                        {transfer.status === 'In-transit' ? (
                           <span className='text-blue-500 font-medium'>
                              {transfer.status}
                           </span>
                        ) : transfer.status === 'Pending' ? (
                           <span className='text-yellow-500 font-medium'>
                              {transfer.status}
                           </span>
                        ) : transfer.status === 'Completed' ? (
                           <span className='text-green-500 font-medium'>
                              {transfer.status}
                           </span>
                        ) : (
                           <span className='text-gray-500 font-medium'>
                              {transfer.status}
                           </span>
                        )}
                     </div>

                     <div className='flex justify-between'>
                        <span className='font-medium'>Price:</span>
                        <span>
                           {transfer.inventoryItem.variations &&
                           transfer.inventoryItem.variations.length > 0 ? (
                              <>
                                 <span className='text-blue-500 font-bold'>
                                    $
                                    {Math.min(
                                       ...transfer.inventoryItem.variations.map(
                                          (vr: any) => vr.price
                                       )
                                    )}{' '}
                                 </span>
                                 -{' '}
                                 <span>
                                    $
                                    {Math.max(
                                       ...transfer.inventoryItem.variations.map(
                                          (vr: any) => vr.price
                                       )
                                    )}
                                 </span>
                              </>
                           ) : (
                              'No variations'
                           )}
                        </span>
                     </div>

                     <div className='flex justify-between'>
                        <span className='font-medium'>From Location:</span>
                        <span>{transfer.fromLocation.name}</span>
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>To Location:</span>
                        <span>{transfer.toLocation.name}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default InternalTransferComp;
