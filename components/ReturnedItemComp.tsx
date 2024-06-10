import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { ItemReturnExtended } from '@/lib/type';

export type ReturnedItemProps = {
   returnedItem: ItemReturnExtended;
};

function ReturnedItemComp({ returnedItem }: ReturnedItemProps) {
   return (
      <div className='container mx-auto px-4 py-8 max-w-3xl'>
         <div className='dark:bg-gray-950 rounded-lg p-6 space-y-6'>
            <div className='flex items-center justify-between'>
               <h1 className='text-2xl font-bold'>Item Return Details</h1>
               <div className='flex items-center space-x-2'>
                  <Button size='sm'>
                     <Download className='w-4 h-4 mr-2' />
                     Download
                  </Button>
                  <Button variant='outline' size='sm'>
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
                           {returnedItem.inventoryItem.name}
                        </span>
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Request:</span>
                        <span className='text-blue-600 font-semibold'>
                           {returnedItem.request}
                        </span>
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Status:</span>
                        <span className='text-purple-600 font-semibold'>
                           {returnedItem.status}
                        </span>
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Result:</span>
                        {returnedItem.result === 'Success' ? (
                           <span className='text-green-500 font-semibold'>
                              {returnedItem.result}
                           </span>
                        ) : (
                           <span className='text-red-500 font-semibold'>
                              {returnedItem.result}
                           </span>
                        )}
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Reason for Return:</span>
                        <span>{returnedItem.reason}</span>
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Return Date:</span>
                        <span>
                           {new Date(
                              returnedItem.returnedAt
                           ).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                           })}
                        </span>
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Return Party:</span>
                        {returnedItem.returningParty === 'Customer' ? (
                           <span className='text-blue-500 font-semibold'>
                              {returnedItem.returningParty}
                           </span>
                        ) : (
                           <span className='text-purple-700 font-semibold'>
                              {returnedItem.returningParty}
                           </span>
                        )}
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Raw:</span>
                        <span>
                           ${returnedItem.inventoryItem.rawCost.toFixed(2)}
                        </span>
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Tax:</span>
                        <span>{returnedItem.inventoryItem.taxRate}%</span>
                     </div>
                     <div className='flex justify-between'>
                        <span className='font-medium'>Shipping:</span>
                        <span>
                           ${returnedItem.inventoryItem.shippingCost.toFixed(2)}
                        </span>
                     </div>
                  </div>
               </div>
               <div>
                  <h2 className='text-lg font-medium mb-2'>Comments</h2>
                  <div className='space-y-4'>
                     {returnedItem.comments.map((comment) => (
                        <div
                           key={comment.commentId}
                           className='bg-gray-100 dark:bg-gray-800 rounded-lg p-4'
                        >
                           <p className='text-gray-500 dark:text-gray-400'>
                              {comment.text}
                           </p>
                           <div className='flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400 '>
                              <span>
                                 {comment.createdAt.toLocaleDateString()}
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ReturnedItemComp;
