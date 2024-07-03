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
            Content Marketing
          </h1>

          <div className="pt-5">
            <p className="text-md pt-5">
              High-quality content marketing is essential for attracting and engaging your target audience. Our content marketing team will create informative and valuable blog posts, articles, infographics, videos, and other content formats that position you as an industry thought leader and establish trust with your customers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
