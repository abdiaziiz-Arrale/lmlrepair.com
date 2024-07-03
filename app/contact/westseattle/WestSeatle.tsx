"use client";
import ContactForm from "../../../components/ContactUs";
import Link from "next/link";
import Image from "next/image";
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

export default function WestSeattle() {
  const images1 = [
    {
      original: "/images/westseattle/1.png",
      thumbnail: "/images/westseattle/1.png",
    },
    {
      original: "/images/westseattle/2.png",
      thumbnail: "/images/westseattle/2.png",
    },
    {
      original: "/images/westseattle/3.png",
      thumbnail: "/images/westseattle/3.png",
    },
    {
      original: "/images/westseattle/4.png",
      thumbnail: "/images/westseattle/4.png",
    },
    {
      original: "/images/westseattle/5.png",
      thumbnail: "/images/westseattle/5.png",
    },
    {
      original: "/images/westseattle/6.png",
      thumbnail: "/images/westseattle/6.png",
    },
    {
      original: "/images/westseattle/7.png",
      thumbnail: "/images/westseattle/7.png",
    },
    {
      original: "/images/westseattle/8.png",
      thumbnail: "/images/westseattle/8.png",
    },
    {
      original: "/images/westseattle/9.png",
      thumbnail: "/images/westseattle/9.png",
    },
  ];

  return (
    <div className="md:p-10 bg-white my-14 md:my-24 flex flex-col mx-5 md:mx-16 ">
      <div className=" flex flex-col md:flex-row my-7 md:my-10 gap-3 md:gap-7 ">
        <div className="flex flex-col ">
          <div className="mb-5">
            <h1 className=" text-2xl md:text-4xl tracking-widest flex justify-center items-center">
              West Seattle Contact
            </h1>
          </div>
          <div className="w-full">
            <Image
              width={400}
              height={400}
              alt="contact"
              src="/images/contact/contact.png"
            />
          </div>

          <div className=" flex flex-col md:flex-row flex-wrap  justify-between items-center">
            <div className="bg-gray-100  p-4 md:p-10 rounded-lg">
              <div className="md:text-lg my-5 flex flex-col gap-3 text-sm">
                <div className="flex flex-row items-center gap-2">
                  <Image
                    width={30}
                    height={30}
                    alt="phone"
                    className="w-6 h-6 md:w-8 md:h-8"
                    src="/images/contact/phone.png"
                  />
                  <b className="text-yellow-300 ">Tel:</b>{" "}
                  <p className=""> (206) 745-2064</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  {" "}
                  <Image
                    width={30}
                    height={30}
                    alt="hours"
                    className="w-6 h-6 md:w-8 md:h-8"
                    src="/images/contact/hours.png"
                  />
                  <b className="text-yellow-300">Hours:</b> Mon-Sun 8AM to 8PM{" "}
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Image
                    width={30}
                    height={30}
                    alt="mail"
                    className="w-6 h-6 md:w-8 md:h-8"
                    src="/images/contact/mail.png"
                  />
                  <b className="text-yellow-300 ">Email:</b>
                  <p>westseattle@lmlrepair.com</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 mb-5">
                <Image
                  width={30}
                  height={30}
                  alt="location"
                  className="w-6 h-6 md:w-8 md:h-8"
                  src="/images/contact/location.png"
                />
                <b className="text-yellow-300">Address:</b>
                3400 Harbor Ave SW STE #332 Seattle, WA 98126
              </div>
              <b>
                <small>Use callbox at the elevator or dial 00332 </small>
              </b>
            </div>
          </div>
        </div>
        <div className=" w-full md:w-1/2 md:ml-20 bg-gray-100 p-5 md:p-10 rounded-lg">
               <ContactForm Customerlocation="WestSeatle" />

        </div>
    
      </div>

      <div>
        <div>
          {/* gallery */}
          <div className="p-5 bg-gray-100  mx-0 md:mx-44 rounded-lg ">
            <div className="flex justify-center items-center py-4 text-2xl md:text-3xl ">
              <h1>location gallery</h1>
            </div>
            <ImageGallery items={images1} autoPlay={true} />
          </div>
          {/* map */}
          <section className="py-10 md:p-10 bg-white rounded-lg">
            <iframe
              src=" https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43125.25857266455!2d-122.19073828661517!3d47.50299028009258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490435d141069cd%3A0x8949cfda1da34803!2sEasy%20Mobile%20Iphone%20Repair!5e0!3m2!1sen!2sus!4v1613693916444!5m2!1sen!2sus "
              height="450 "
              style={{ border: "0px" }}
              aria-hidden="false"
              title="Shop Location"
              className="w-full"
            ></iframe>
          </section>
          {/* icons */}
          <section className="flex gap-5 justify-center items-center border-t-2 border-gray-300 p-5 mt-7 ">
            <Link href="https://g.page/r/CQNIox3az0mJEBA" className="w-24  ">
              <Image
                src="/images/socials/google.png"
                height={144}
                width={144}
                alt="Google"
              />
            </Link>
            <Link
              href="https://www.yelp.com/biz/lml-repair-seattle"
              className="w-24 "
            >
              <Image
                src="/images/socials/yelp.png"
                height={144}
                width={144}
                alt="Yelp"
              />
            </Link>
            <Link
              href="https://www.facebook.com/lmlrepairwestseattle/"
              className="w-24"
            >
              <Image
                src="/images/socials/facebook.png"
                alt="FaceBook"
                height={144}
                width={144}
              />
            </Link>
            <Link
              href="https://www.bing.com/maps?osid=d02515d8-a8d9-4184-9cbd-a874b9d8e1c0&cp=47.572791~-122.375851&lvl=16&pi=0&imgid=73a3bdda-d814-496c-abdb-5d354be444c1&v=2&sV=2&form=S00027"
              className="w-24"
            >
              <Image
                src="/images/listings/bing.png"
                alt="Bing"
                height={144}
                width={144}
              />
            </Link>

            <Link
              href="https://maps.apple.com/?address=3400%20Harbor%20Ave%20SW,%20Unit%20332,%20Seattle,%20WA%20%2098126,%20United%20States&auid=4668742424166868931&ll=47.572711,-122.370431&lsp=9902&q=LML%20Repair"
              className="w-24"
            >
              <Image
                src="/images/listings/apple.png"
                alt="Apple"
                height={144}
                width={144}
              />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
