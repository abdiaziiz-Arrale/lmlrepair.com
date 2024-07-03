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
            Social Media Management
          </h1>
          <div className="pt-5">
            <p className="text-md pt-5">
              Social media is a powerful tool for building brand awareness, engaging with your target audience, and driving traffic to your website. Our social media management services provide everything you need to establish a strong social media presence. We'll develop a comprehensive social media strategy, create engaging content, manage your social media accounts, and track and analyze your results.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
