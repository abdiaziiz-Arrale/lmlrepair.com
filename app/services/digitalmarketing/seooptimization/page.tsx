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
            SEO Optimization
          </h1>

          <div className="pt-5">
            <p className="text-md pt-5">
              Search Engine Optimization (SEO) is the art and science of increasing your website's visibility in search engine results pages (SERPs). Our SEO specialists will work tirelessly to optimize your website content, technical structure, and backlink profile to improve your organic ranking and drive qualified traffic to your site. This translates into increased brand awareness, lead generation, and ultimately, more sales.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
