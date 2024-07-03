import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/website/footer";
import Header from "@/components/website/header";

export default function Contact() {
  return (
    <div>
      <Header />

      <main className="flex flex-col justify-center items-center p-5 md:p-10 py-16 md:py-32">
        <div className="text-center mb-5 max-w-4xl">
          <h1 className="text-4xl text-red-600 tracking-widest mx-auto flex justify-center text-center">
            PPC Advertising
          </h1>

          <div className="pt-5">
            <p className="text-md pt-5">
              Pay-Per-Click (PPC) advertising allows you to reach a highly targeted audience through paid search ads on platforms like Google Ads and social media. Our PPC experts will develop and manage effective PPC campaigns to ensure you get the most out of your advertising budget. We'll create targeted ad copy, optimize your landing pages, and track campaign performance to maximize your return on investment (ROI).
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
