'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CheckIcon, MoonStar, Palette, SunMoon } from 'lucide-react';

export function ThemeSwitcher() {
   const { setTheme, theme } = useTheme();

   const isActive = (themeName: string) => {
      return theme === themeName && <CheckIcon className='ml-2 h-4 w-4' />;
   };
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant='outline'
               size='icon'
               className={`${
                  theme === 'light'
                     ? 'rounded-full p-0 bg-black hover:bg-muted text-white hover:text-muted-foreground border-0 outline-none'
                     : 'rounded-full p-0 bg-white hover:bg-muted text-black hover:text-muted-foreground border-0 outline-none'
               }`}
            >
               <Palette className='w-6 h-6' />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align='end' className='z-[99998]'>
            <DropdownMenuItem onClick={() => setTheme('light')}>
               <span>Light</span>
               {theme === 'light' && <SunMoon className='ml-2 h-4 w-4' />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
               <span>Dark</span>
               {theme === 'light' && <MoonStar className='ml-2 h-4 w-4' />}
               {isActive('dark')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('custom')}>
               <span>System</span>
               {theme === 'custom' && <CheckIcon className='ml-2 h-4 w-4' />}
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
