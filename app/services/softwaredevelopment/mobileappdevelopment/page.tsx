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
            Mobile Application Development
          </h1>
          <div className="pt-5">
            <p className="text-md pt-5">
              In today's mobile-first world, a well-designed and functional mobile app is crucial for reaching your target audience and staying ahead of the competition. Our mobile app development team specializes in creating native apps for iOS and Android devices. We'll work closely with you to understand your specific needs and build an app that is not only visually appealing but also engaging, user-friendly, and optimized for performance.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
