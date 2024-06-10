import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.css';
import ModalProvider from '@/providers/model-provider';

const karla = Karla({
   weight: ['200', '300', '400', '500', '600', '700', '800'],
   subsets: ['latin'],
   variable: '--font-karla',
});
export const metadata: Metadata = {
   title: 'LML',
   description: 'LML',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='en' suppressHydrationWarning>
         <body className={karla.className}>
            <ModalProvider>
               <main>{children}</main>
               <Toaster />
            </ModalProvider>
         </body>
      </html>
   );
}
