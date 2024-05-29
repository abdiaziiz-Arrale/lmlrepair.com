'use client';

import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover';

export function DatePickerDemo() {
   const [date, setDate] = React.useState<Date>();

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button className='space-x-1'>
               <CalendarIcon size={20} />
               <span>Date</span>
            </Button>
         </PopoverTrigger>
         <PopoverContent className='w-auto p-0'>
            <Calendar
               mode='single'
               selected={date}
               onSelect={setDate}
               initialFocus
            />
         </PopoverContent>
      </Popover>
   );
}
