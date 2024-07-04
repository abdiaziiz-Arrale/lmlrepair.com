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
            Web Design
          </h1>

          <div className="pt-5">
            <p className="text-md pt-5">
              At LML Digitals, we specialize in creating visually appealing and highly functional web designs that capture the essence of your brand. Our design process is user-centric, ensuring that every element on your website is intuitive and enhances the user experience. From responsive designs that look great on any device to interactive elements that engage your audience, our goal is to build websites that are not only aesthetically pleasing but also drive results. Whether you need a fresh redesign or a brand-new site, our design team is ready to bring your ideas to life with creativity and precision.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
