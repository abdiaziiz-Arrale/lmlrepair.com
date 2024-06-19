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
        <h1 className="text-yellow-300 tracking-wider">About Us</h1>
        <h1 className="text-xl md:text-2xl tracking-wider ">
          Expert Solutions for Your Electronic Repair Needs Today
        </h1>
      </motion.div>
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 2)}
        className="flex flex-col md:flex-row justify-center items-center"
      >
        <div className="flex flex-col justify-between h-full bg-gray-100 w-full md:w-1/2 p-4 md:p-7">
          <h1 className="mb-5 text-xl md:text-2xl ">
            Experience An LML Repair Today
          </h1>
          <p>
            Enter our office today, and you can expect premier customer service,
            starting with a low cost diagnostic test and a free quote for
            repairs with no obligation to purchase. With waiting times as short
            as 30 minutes and a large stock of high quality parts, and
            reasonable prices we are ready to help you should you decide to go
            ahead with the fix. Combine this 5-star service with afforable
            warranty plans on all repairs, and it’s no wonder that LML Repair is
            Seattle’s first choice for electronic repairs.
          </p>
        </div>
        <div className="w-full md:w-1/3 md:ml-10">
          <Image
            alt="assistant"
            width={350}
            height={350}
            src="/images/about us/assistant.png"
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
            src="/images/about us/appiontment.png"
          />
        </div>
        <div className="flex flex-col justify-between h-full bg-gray-100 md:ml-10 w-full md:w-1/2 p-4 md:p-7">
          <h1 className="mb-5 text-xl md:text-2xl">
            Schedule your repair online!
          </h1>
          <p>
            At LML Repair, all repairs come with low cost diagnostics and
            afforable warranty plans – use our fast device repair services with
            confidence and leave with peace of mind that we’ve got your back, no
            matter what happens.
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
