import { ThemeProvider } from '@/components/theme-provider';
import { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.css';

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
         <body className={karla.className + ' h-screen overflow-hidden'}>
            <ThemeProvider
               themes={['dark', 'custom', 'light']}
               attribute='class'
               enableSystem
               disableTransitionOnChange
            >
               <>
                  <div className='flex flex-col h-full w-full'>
                     <main>{children}</main>
                  </div>
               </>
            </ThemeProvider>
         </body>
      </html>
   );
}
