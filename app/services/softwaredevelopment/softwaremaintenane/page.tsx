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
            Software Maintenance
          </h1>

          <div className="pt-5">
            <p className="text-md pt-5">
              Keeping your software applications up-to-date and functioning smoothly is essential for business continuity and security. Our software maintenance services ensure that your software remains stable, secure, and performs optimally. We offer a range of maintenance services, including bug fixes, security updates, performance optimization, and feature enhancements.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
