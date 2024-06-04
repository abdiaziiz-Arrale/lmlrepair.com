import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import Link from 'next/link';

export default function EditLocation() {
   return (
      <div className='flex h-screen'>
         <div className='m-auto  p-8 rounded-lg  w-1/2'>
            <div className='flex justify-between items-center mb-8'>
               <Link href={'/dashboard/inventory/locations'}>
                  <Button variant={'ghost'}>
                     <X className='h-6 w-6' />
                  </Button>
               </Link>
               <h1 className='text-2xl font-semibold'>Edit Location</h1>
               <Button variant='default'>Save</Button>
            </div>
            <div>
               <h2 className='text-lg font-medium mb-4'>Details</h2>
               <div className='space-y-4'>
                  <div className='flex flex-col'>
                     <Label htmlFor='location'>Location</Label>
                     <Input
                        id='location'
                        placeholder='e.g Seattle Warehouse A'
                     />
                  </div>
                  <div className='flex flex-col'>
                     <Label htmlFor='description'>Description</Label>
                     <Textarea
                        id='description'
                        placeholder='e.g Main warehouse for storing inventory items.'
                        className='min-h-[100px]'
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
