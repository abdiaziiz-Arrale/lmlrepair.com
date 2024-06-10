'use client';
import { useModal } from '@/providers/model-provider';
import React from 'react';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
} from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

type CustomModalProps = {
   title?: string;
   subheading?: string;
   content?: React.ReactNode;
};

const CustomModal = ({ title, subheading, content }: CustomModalProps) => {
   const { isOpen, setClose } = useModal();
   return (
      <Dialog open={isOpen} onOpenChange={setClose}>
         <DialogContent className='overflow-auto h-full w-full bg-card p-6'>
            <DialogHeader className='pt-4 text-left'>
               <DialogTitle className='text-2xl font-bold'>{title}</DialogTitle>
               <DialogDescription className='mb-4'>
                  {subheading}
               </DialogDescription>
            </DialogHeader>
            <div className='flex flex-col items-center justify-center h-full'>
               {content}
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default CustomModal;
