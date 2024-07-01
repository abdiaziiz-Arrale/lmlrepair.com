import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/website/footer";
import Header from "@/components/website/header";

export default function Contact() {
  return (
    <div>
      <Header />

      <main className="flex flex-col  justify-center items-center p-5 md:p-10 py-16 md:py-32">
        <div className="mb-5">
          <h1 className="text-4xl text-red-500 tracking-widest mx-auto flex justify-center text-center">
            Contact
          </h1>
          <p className="text-md ">
            Select the location you would like to contact
          </p>
        </div>

        <article className="flex  bg-gray-100 flex-col md:flex-row gap-5 justify-center text-center p-5 md:p-14 rounded-lg ">
          <figure className="bg-white radius p-5">
            <figcaption className="text-2xl mb-4">West Seattle</figcaption>
            <Link href="/contact/westseattle">
              <Image
                src="/images/westseattle/1.png"
                alt="West Seattle Contact"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </Link>
          </figure>

          <figure className="bg-white radius p-5">
            <figcaption className="text-2xl mb-4">Seattle</figcaption>
            <Link href="/contact/seattle">
              <Image
                src="/images/seattle/1.png"
                alt="Seattle Contact"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </Link>
          </figure>

          <figure className="bg-white radius p-5 w1/2">
            <figcaption className="text-2xl mb-4">North Seattle</figcaption>
            <Link href="/contact/northseattle">
              <Image
                src="/images/northseattle/1.png"
                alt="North Seattle Contact"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </Link>
          </figure>
        </article>
      </main>
      <Footer />
    </div>
  );
}
{
}
