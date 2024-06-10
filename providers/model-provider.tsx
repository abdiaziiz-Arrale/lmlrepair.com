'use client';
import CustomModal from '@/components/ui/CustomModel';
import {
   createContext,
   useContext,
   useEffect,
   useState,
   ReactNode,
} from 'react';

interface ModalProviderProps {
   children: React.ReactNode;
}

export type ModalData = {
   title?: string;
   subheading?: string;
   content?: ReactNode;
};

type ModalContextType = {
   data: ModalData;
   isOpen: boolean;
   setOpen: (modalData: any) => void;
   setClose: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
   undefined
);

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [data, setData] = useState<ModalData>({});
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   const setOpen = (modalData: any) => {
      setData(modalData);
      setIsOpen(true);
   };

   const setClose = () => {
      setIsOpen(false);
      setData({});
   };

   if (!isMounted) return null;

   return (
      <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
         {children}
         {isOpen && <CustomModal {...data} />}
      </ModalContext.Provider>
   );
};

export const useModal = () => {
   const context = useContext(ModalContext);
   if (!context) {
      throw new Error('useModal must be used within the ModalProvider');
   }
   return context;
};

export default ModalProvider;
