import { Metadata } from "next";
import { Bangers } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  style: "normal",
});
export const metadata: Metadata = {
  title: "LML Repair",
  description:
    "LML Repair is a repair service company that specializes in fixing electronics.",
  icons: "/lml_logo.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bangers.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
