'use client';
import { useModal } from '@/providers/model-provider';
import React from 'react';
import { Dialog, DialogContent } from '../dialog';

type CustomModalProps = {
   content?: React.ReactNode;
};

const CustomModal = ({ content }: CustomModalProps) => {
   const { isOpen, setClose } = useModal();
   return (
      <Dialog open={isOpen} onOpenChange={setClose}>
         <DialogContent className='overflow-auto h-full w-full bg-card p-6'>
            {content}
         </DialogContent>
      </Dialog>
   );
};

export default CustomModal;
