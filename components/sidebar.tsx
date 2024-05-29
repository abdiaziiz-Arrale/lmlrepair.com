'use client';
import { SIDENAV_ITEMS } from '@/app/dashboard/menu_constants';
import { useSideBarToggle } from '@/hooks/use-sidebar-toggle';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { SideBarLogo } from './sidebar-logo';
import SideBarMenuGroup from './sidebar-menu-group';

export const SideBar = () => {
   const [mounted, setMounted] = useState(false);
   const { toggleCollapse } = useSideBarToggle();

   const asideStyle = classNames(
      'sidebar fixed bg-sidebar h-full shadow-sm shadow-slate-500/40 transition duration-400 ease-in-out z-[99999]',
      {
         ['w-[20rem]']: !toggleCollapse,
         ['sm:w-[5.4rem] sm:left-0 left-[-100%]']: toggleCollapse,
      }
   );

   useEffect(() => setMounted(true), []);

   return (
      <aside className={asideStyle}>
         <div className='relative flex flex-col h-full '>
            <div className='sidebar-top flex items-center px-3.5 py-2 fixed w-[inherit] z-[99998]'>
               {mounted && <SideBarLogo />}
               <h3
                  className={classNames(
                     'pl-3 font-bold text-3xl min-w-max text-sidebar-foreground tracking-widest',
                     { hidden: toggleCollapse }
                  )}
               >
                  LML
               </h3>
            </div>
            <nav className='flex-1 overflow-y-auto overflow-x-hidden transition duration-300 ease-in-out mt-[80px] '>
               <div className='flex flex-col gap-2 px-4'>
                  {SIDENAV_ITEMS.map((item, idx) => {
                     return <SideBarMenuGroup key={idx} menuGroup={item} />;
                  })}
               </div>
            </nav>
         </div>
      </aside>
   );
};
