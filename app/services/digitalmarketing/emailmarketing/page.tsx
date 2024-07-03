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
            Email Marketing
          </h1>

          <div className="pt-5">
            <p className="text-md pt-5">
              Email marketing remains one of the most effective digital marketing channels for nurturing leads, promoting your services, and building lasting customer relationships. Our email marketing specialists will help you develop and implement targeted email campaigns that drive results. We'll design engaging email templates, manage your email list, and track campaign performance so you can optimize your efforts for maximum impact.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
