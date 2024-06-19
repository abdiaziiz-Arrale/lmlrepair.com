"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion";
import Image from "next/image";

function Services() {
  return (
    <motion.div
      variants={(staggerContainer(0.5, 0.5), fadeIn("up", "tween", 0.2, 1))}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col mx-5 md:mx-24 my-24  px-6  py-7 rounded-lg"
    >
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="text-center mb-10"
      >
        <h1 className="text-yellow-300 tracking-wider">Our services</h1>
        <h1 className="text-lg md:text-xl tracking-wider ">
          Electronic Repair Services-Fast, Reliable Solutions for You
        </h1>
      </motion.div>
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="flex flex-wrap justify-center items-center gap-3 mt-5"
      >
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3   bg-gray-50 px-5 py-7 radius">
          <div className="w-20 bg-yellow-200 rounded-full p-2 mb-3">
            <Image
              alt="expert"
              width={100}
              height={100}
              className="w-full"
              src="/images/services/expert.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>Expert Electronic Repair</h1>
            <p className="text-md ">
              Reliable solutions for all device malfunctions.
            </p>
          </div>
        </div>
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3  bg-gray-50 px-5 py-7 radius">
          <div className="w-20 bg-yellow-200 rounded-full p-2 mb-3">
            <Image
              alt="diagnostic"
              width={40}
              height={40}
              className="w-full"
              src="/images/services/diagnostic.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>Advanced Diagnostic Solutions</h1>
            <p className="text-md ">
              Precision diagnostics for troubleshooting with innovation.
            </p>
          </div>
        </div>
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3  bg-gray-50 px-5 py-7 radius">
          <div className="w-16 bg-yellow-200 rounded-full p-3 mb-3">
            <Image
              alt="price"
              width={100}
              height={100}
              className="w-full "
              src="/images/services/price.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>Buyback</h1>
            <p className="text-md ">
              Trade-in old electronics for cash or credit
            </p>
          </div>
        </div>
        <Image
          alt="repair"
          width={100}
          height={100}
          className="w-52"
          src="/service.png"
        />
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3  bg-gray-50 px-5 py-7 radius">
          <div className="w-20 bg-yellow-200 rounded-full p-2 mb-3">
            <Image
              alt="clean"
              width={100}
              height={100}
              className="w-full"
              src="/images/services/clean.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>Thorough Device Cleaning</h1>
            <p className="text-md ">
              Revitalize gadgets with meticulous cleaning services.
            </p>
          </div>
        </div>
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3  bg-gray-50 px-5 py-7 radius">
          <div className="w-20 bg-yellow-200 rounded-full p-3 mb-3">
            <Image
              alt="repair"
              width={80}
              height={80}
              className="w-full"
              src="/repair.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>Customized Repair Solutions</h1>
            <p className="text-md ">
              Tailor your device to match your unique style and preferences.
            </p>
          </div>
        </div>
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3  bg-gray-50 px-5 py-7 radius">
          <div className="w-20 bg-yellow-200 rounded-full p-2 mb-3">
            <Image
              alt="unlock"
              width={100}
              height={100}
              className="w-full"
              src="/images/services/unlock.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>Seamless Unlocking Services</h1>
            <p className="text-md ">
              Unlock your device for expanded flexibility and functionality.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Services;
