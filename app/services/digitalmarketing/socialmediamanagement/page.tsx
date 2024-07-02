import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/website/footer";
import Header from "@/components/website/header";

export default function Contact() {
  return (
    <div>
      <Header />

      <main className="flex flex-col justify-center items-center p-5 md:p-10 py-16 md:py-32">
        <div className="mb-5">
          <h1 className="text-4xl text-red-600 tracking-widest mx-auto flex justify-center text-center">
            Social Media Management
          </h1>

          <div className="items-center">
          <p className="text-md text-center font-semibold pt-5">Our Expertise</p>
          <p className="text-md text-left pt-5">At LML, we craft visually stunning, user-friendly websites that drive business growth. Our skilled team leverages the latest web technologies to ensure your site is both beautiful and highly functional.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
