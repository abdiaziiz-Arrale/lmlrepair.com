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
            Website Development
          </h1>

          <div className="pt-5">
            <p className="text-md font-semibold">Our Expertise</p>
            <p className="text-md pt-5 font-medium">
              At LML Digitals, we craft stunning and user-friendly websites that not only look great but also convert visitors into leads and customers. Our web development and design services encompass the entire process, from conceptualizing and designing a website that reflects your brand identity to developing a secure and scalable website that provides a seamless user experience across all devices. Whether you need a simple brochure website, a complex e-commerce platform, or a custom web application, we have the expertise to bring your vision to life.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
