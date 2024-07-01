"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion";
import Image from "next/image";

function AboutUs() {
  return (
    <motion.div
      variants={staggerContainer(0.5, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col mx-5 md:mx-16 my-24"
    >
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="text-center mb-10"
      >
        <h1 className="text-red-500 tracking-wider">About Us</h1>
        <h1 className="text-xl md:text-2xl tracking-wider ">
          Expert Solutions for Your Business Needs Today
        </h1>
      </motion.div>
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 2)}
        className="flex flex-col md:flex-row justify-center items-center"
      >
        <div className="flex flex-col justify-between h-full bg-gray-100 w-full md:w-1/2 p-4 md:p-7">
          <h1 className="mb-5 text-xl md:text-2xl ">
            Experience LML Digitals Today
          </h1>
          <p>
          Discover the transformative power of LML Digitals through innovative strategies and personalized digital solutions. Embrace excellence and elevate your online presence with us today..
          </p>
        </div>
        <div className="w-full md:w-1/3 md:ml-10">
          <Image
            alt="assistant"
            width={350}
            height={350}
            src="/businesstalk.svg"
          />
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 2)}
        className="flex flex-col md:flex-row justify-center items-center md:mt-4"
      >
        <div className="hidden md:block w-full md:w-1/3 ">
          <Image
            alt="appiontment"
            width={350}
            height={350}
            src="/becomeclient.png"
          />
        </div>
        <div className="flex flex-col justify-between h-full bg-gray-100 md:ml-10 w-full md:w-1/2 p-4 md:p-7">
          <h1 className="mb-5 text-xl md:text-2xl">
            Become a Client Today!
          </h1>
          <p>
          Unlock your business potential with our cutting-edge solutions tailored to your needs. Partner with us and experience exceptional growth and success.
          </p>
        </div>
        <div className="block md:hidden w-full md:w-1/3 ">
          <Image
            alt="appiontment"
            width={350}
            height={350}
            src="/images/about us/appiontment.png"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AboutUs;
