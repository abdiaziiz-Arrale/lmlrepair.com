import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import Link from 'next/link';

function CreateNewItem() {
   return (
      <div className='flex flex-col'>
         <div className='flex items-center justify-between p-6 bg-white '>
            <Link href={'/dashboard/inventory/items'}>
               <Button variant={'secondary'}>
                  <X size={20} />
               </Button>
            </Link>
            <h1 className='text-xl font-medium'>Create Item</h1>
            <Button>Save</Button>
         </div>
         <div className='flex flex-col items-center p-6 space-y-4'>
            <h1 className='font-bold text-lg'>Details</h1>
            <form className='space-y-4 w-full max-w-lg'>
               <div>
                  <Label className='block mb-1'>Item</Label>
                  <Input placeholder='e.g Iphone 12' className='w-full' />
               </div>
               <div>
                  <Label className='block mb-1'>SKU</Label>
                  <Input placeholder='SKU...' className='w-full' />
               </div>
               <div>
                  <Label className='block mb-1'>Variations</Label>
                  <Input placeholder='Variations....' className='w-full' />
               </div>
               <div>
                  <Label className='block mb-1'>Vendor</Label>
                  <Input placeholder='Vendor....' className='w-full' />
               </div>

               <div className='flex items-center  justify-between'>
                  <div>
                     <Label className='block mb-1'>Stock</Label>
                     <Input placeholder='e.g 20' className='w-full' />
                  </div>
                  <div>
                     <Label className='block mb-1 text-right'>Cost</Label>
                     <Input placeholder='e.g $10' className='w-full' />
                  </div>
               </div>

               <div className='flex items-center justify-between gap-6'>
                  <div className='w-screen'>
                     <Label className='block mb-1'>Categories</Label>
                     <Select>
                        <SelectTrigger className='w-full'>
                           <SelectValue placeholder='Select a Category' />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value='Parts'>Parts</SelectItem>
                           <SelectItem value='Equipments'>
                              Equipments
                           </SelectItem>
                           <SelectItem value='Accessories'>
                              Accessories
                           </SelectItem>
                           <SelectItem value='Devices'>Devices</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className='w-screen'>
                     <Label className='block mb-1 text-right'>
                        Sub Categories
                     </Label>
                     <Select>
                        <SelectTrigger className='w-full'>
                           <SelectValue placeholder='Select a sub category' />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel className='text-lg'>
                                 Parts
                              </SelectLabel>
                              <SelectItem value='Screen'>Screen</SelectItem>
                              <SelectItem value='Back Glass'>
                                 Back Glass
                              </SelectItem>
                              <SelectItem value='Battery'>Battery</SelectItem>
                              <SelectItem value='Charging Port'>
                                 Charging Port
                              </SelectItem>
                              <SelectItem value='Back Camera'>
                                 Back Camera
                              </SelectItem>
                              <SelectItem value='Front Camera'>
                                 Front Camera
                              </SelectItem>
                              <SelectItem value='Back Camera Lens'>
                                 Back Camera Lens
                              </SelectItem>
                              <SelectItem value='Loudspeaker'>
                                 Loudspeaker
                              </SelectItem>
                              <SelectItem value='Earpiece'>Earpiece</SelectItem>
                              <SelectItem value='Proximity Sensor'>
                                 Proximity Sensor
                              </SelectItem>
                              <SelectItem value='Taptic Engine'>
                                 Taptic Engine
                              </SelectItem>
                           </SelectGroup>
                           <SelectGroup>
                              <SelectLabel className='text-lg'>
                                 Equipments
                              </SelectLabel>
                              <SelectItem value='Tools'>Tools</SelectItem>
                              <SelectItem value='Supplies'>Supplies</SelectItem>
                           </SelectGroup>
                           <SelectGroup>
                              <SelectLabel className='text-lg'>
                                 Accessories
                              </SelectLabel>
                              <SelectItem value='Cases'>Cases</SelectItem>
                              <SelectItem value='Chargers'>Chargers</SelectItem>
                              <SelectItem value='Screen Protectors'>
                                 Screen Protectors
                              </SelectItem>
                           </SelectGroup>
                           <SelectGroup>
                              <SelectLabel className='text-lg'>
                                 Devices
                              </SelectLabel>
                              <SelectItem value='Phone'>Phone</SelectItem>
                              <SelectItem value='Tablet'>Tablet</SelectItem>
                              <SelectItem value='Laptop'>Laptop</SelectItem>
                              <SelectItem value='Watch'>Watch</SelectItem>
                              <SelectItem value='Computer'>Computer</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               <div>
                  <Label className='block mb-1'>Locations</Label>
                  <Select>
                     <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a location' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value='Warehouse A'>Warehouse A</SelectItem>
                        <SelectItem value='Warehouse B'>Warehouse B</SelectItem>
                        <SelectItem value='Retail Store 1'>
                           Retail Store 1
                        </SelectItem>
                        <SelectItem value=' Retail Store 2'>
                           Retail Store 2
                        </SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreateNewItem;
