import { Toaster } from "@/components/ui/toaster";
import ModalProvider from "@/providers/model-provider";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
  style: "normal",
});
export const metadata: Metadata = {
  title: "LML Repair",
  description:
    "LML Repair is a repair service company that specializes in fixing electronics.",
  icons: "/lml_logo.png",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <SessionProvider>
          
        <ModalProvider>
          <main>{children}</main>
          <Toaster />
        </ModalProvider></SessionProvider>
          <Script
          src="https://static.elfsight.com/platform/platform.js"
          data-use-service-core
          strategy="lazyOnload"
        />
        <div className="elfsight-app-2c0a143a-11a1-4e98-87e4-49a89e2fc941" data-elfsight-app-lazy></div>
      </body>
    </html>
  );
}
