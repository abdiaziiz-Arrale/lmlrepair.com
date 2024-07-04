import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";
import ContactForm from "./ContactForm";
import { useState } from "react";

export default function Contactus() {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row justify-center items-start p-5 md:p-10 py-16 md:py-32 pl-7">
                {/* left side with text */}
            <div className="md:w-1/2 mt-4 md:mt-0 text-center md:text-left pt-32">
              <p className="text-sm font-bold pb-5"> Get in Touch</p>
              <p className="text-6xl pb-2 font-bold">Hey there!</p>
              <p className="text-6xl text-red-500 font-bold">Let's Chat</p>
              <p className="font-bold text-xl">Interested in working with us?</p>
              <p className="pt-5">Or have a general enquiry? Fill in the form today, and our team will be in touch shortly.</p>
              <p className="text-xl font-bold pt-9">Hate Forms?</p>
              <p className="pt-6">Email us - <Link href="https://lmldigitals.com" className="text-blue-500 underline">marketing@lmldigitals.com</Link></p>

            </div>
        {/* right side with Contact Form and Icons */}
        <div className="">
          <div className="mb-5">
          </div>
            <ContactForm />
        </div>
          {/* Icons at the most left */}
        <div className="mt-3 items-center size-7 pt-32">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mr-4">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mr-4">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="https://youtube.com" target="_blang" rel="noopener noreferrer" className="mr-4 pt-5">
              <FontAwesomeIcon icon={faYoutube} size="lg"/>
            </a>
          </div>
      </div>
    </>
  );
}
