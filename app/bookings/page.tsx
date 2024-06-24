import Link from "next/link";
import Image from "next/image";
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";

export default function Bookings() {
  return (
    <>
      <Header />
      <div className="flex flex-col  justify-center items-center p-5 md:p-10 py-16 md:py-32">
        <div className="mb-5">
          <h1 className="text-4xl text-yellow-300 tracking-widest mx-auto flex justify-center text-center">
            Bookings
          </h1>
          <p className="text-md ">Select your preferred appointment location</p>
        </div>

        <article className="flex  bg-gray-100 flex-col md:flex-row gap-5 justify-center text-center p-5 md:p-14 rounded-lg ">
          <figure className="bg-white radius p-5">
            <figcaption className="text-2xl mb-3">West Seattle</figcaption>{" "}
            <Link href="/bookings/westseattle">
              <Image
                src="/images/westseattle/1.png"
                alt="West Seattle Booking"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </Link>
          </figure>

          <figure className="bg-white radius p-5">
            <figcaption className="text-2xl mb-3">Seattle</figcaption>{" "}
            <Link href="/bookings/seattle">
              <Image
                src="/images/seattle/1.png"
                alt="Seattle Booking"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </Link>
          </figure>

          <figure className="bg-white radius p-5">
            <figcaption className="text-2xl mb-3">North Seattle</figcaption>{" "}
            <Link href="/bookings/northseattle">
              <Image
                src="/images/northseattle/1.png"
                alt="North Seattle Booking"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </Link>
          </figure>
        </article>
      </div>
      <Footer />
    </>
  );
}
