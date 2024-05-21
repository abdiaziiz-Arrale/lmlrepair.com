'use client';
import CustomContainer from '@/components/CustomContainer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Pencil, Table } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface props {
   params: {
      id: string;
   };
}

interface Services {
   _id: number;
   typeOfRepair: string;
   Raw: number;
   Tax: number;
   Shipping: number;
   Labour: number;
   TimeFrame: string;
   Total: number;
}

function OneService({ params }: props) {
   const router = useRouter();
   const { theme } = useTheme();

   const data: Services[] = [
      {
         _id: 1,
         typeOfRepair: 'Screen Replacement',
         Raw: 45,
         Tax: 10.5,
         Shipping: 5,
         Labour: 5,
         TimeFrame: '130 mins',
         Total: 130,
      },
      {
         _id: 2,
         typeOfRepair: 'Data Recovery',
         Raw: 80,
         Tax: 10.5,
         Shipping: 5,
         Labour: 5,
         TimeFrame: '130 mins',
         Total: 130,
      },
      {
         _id: 3,
         typeOfRepair: 'Troubleshooting',
         Raw: 70,
         Tax: 10.5,
         Shipping: 5,
         Labour: 5,
         TimeFrame: '100 mins',
         Total: 130,
      },
      {
         _id: 4,
         typeOfRepair: 'Backup',
         Raw: 60,
         Tax: 10.5,
         Shipping: 5,
         Labour: 5,
         TimeFrame: '100 mins',
         Total: 130,
      },
   ];

   return (
      <CustomContainer>
         <div className='flex flex-col gap-7'>
            <Card>
               <div className='flex justify-between p-5'>
                  <div className='flex items-center gap-4 '>
                     <Image
                        src={'/favicon.png'}
                        width={80}
                        height={80}
                        alt={`one service - ${params?.id}`}
                     />

                     <div className='flex flex-col gap-1'>
                        <div className='flex gap-4'>
                           <h1 className='text-2xl font-semibold'>
                              Software Service
                           </h1>
                           <Pencil
                              size={20}
                              className='text-blue-500 cursor-pointer'
                           />
                        </div>
                        <div className='flex items-center gap-1'>
                           <Label>Name: </Label>
                           <p>Software</p>
                        </div>
                        <div className='flex items-center gap-1'>
                           <Label>Description: </Label>
                           <p>This is a Software service</p>
                        </div>
                     </div>
                  </div>
                  <div>
                     <Button
                        className={`${
                           theme === 'light'
                              ? 'bg-primary text-secondary-foreground'
                              : 'bg-primary text-secondary'
                        }`}
                        onClick={() => router.back()}
                     >
                        Go Back
                     </Button>
                  </div>
               </div>
            </Card>
            <Card>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead className='w-80'>Type Of Repair</TableHead>
                        <TableHead>Raw</TableHead>
                        <TableHead>Tax</TableHead>
                        <TableHead>Shipping</TableHead>
                        <TableHead>Labour</TableHead>
                        <TableHead>Time Frame</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Type</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {data?.map((rt) => (
                        <TableRow>
                           <TableCell className='font-medium w-80 hover:underline hover:text-blue-500'>
                              {rt?.typeOfRepair}
                           </TableCell>
                           <TableCell className='font-medium'>
                              {rt?.Raw}
                           </TableCell>
                           <TableCell className='font-medium w-80 '>
                              {rt?.Tax}
                           </TableCell>
                           <TableCell className='font-medium'>
                              {rt?.Shipping}
                           </TableCell>
                           <TableCell className='font-medium'>
                              {rt?.Labour}
                           </TableCell>
                           <TableCell className='font-medium'>
                              {rt?.TimeFrame}
                           </TableCell>
                           <TableCell className='font-medium'>
                              {rt?.Total}
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </Card>
         </div>
      </CustomContainer>
   );
}

export default OneService;
