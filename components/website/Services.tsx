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
        <h1 className="text-red-500 tracking-wider">Our services</h1>
        <h1 className="text-lg md:text-xl tracking-wider ">
          Our Services are Fast, Reliable Solutions tailored for You
        </h1>
      </motion.div>
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="flex flex-wrap justify-center items-center gap-3 mt-5"
      >
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3   bg-gray-50 px-5 py-7 radius">
          <div className="w-20 bg-red-500 rounded-full p-2 mb-3">
            <Image
              alt="expert"
              width={100}
              height={100}
              className="w-full"
              src="/images/services/expert.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>Software Development</h1>
            <p className="text-md ">
            Custom software solutions tailored to your business needs, from web applications to mobile apps.
            </p>
          </div>
        </div>
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3  bg-gray-50 px-5 py-7 radius">
          <div className="w-20 bg-red-500 rounded-full p-2 mb-3">
            <Image
              alt="diagnostic"
              width={40}
              height={40}
              className="w-full"
              src="/images/services/diagnostic.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>Digital Marketing</h1>
            <p className="text-md ">
            Strategic digital marketing campaigns to boost brand visibility, attract leads, and increase conversions.
            </p>
          </div>
        </div>
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3  bg-gray-50 px-5 py-7 radius">
          <div className="w-16 bg-red-500 rounded-full p-3 mb-3">
            <Image
              alt="price"
              width={100}
              height={100}
              className="w-full "
              src="/images/services/price.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>UI/UX Design</h1>
            <p className="text-md ">
            Creative and user-centric design solutions for intuitive and engaging user experiences.
            </p>
          </div>
        </div>
        <Image
          alt="repair"
          width={100}
          height={100}
          className="w-52"
          src="/coding.png"
        />
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3  bg-gray-50 px-5 py-7 radius">
          <div className="w-20 bg-red-500 rounded-full p-2 mb-3">
            <Image
              alt="clean"
              width={100}
              height={100}
              className="w-full"
              src="/images/services/clean.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>Consulting and Support</h1>
            <p className="text-md ">
            Expert advice and ongoing support to optimize your digital strategy and ensure seamless operations.
            </p>
          </div>
        </div>
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3  bg-gray-50 px-5 py-7 radius">
          <div className="w-20 bg-red-500 rounded-full p-3 mb-3">
            <Image
              alt="repair"
              width={80}
              height={80}
              className="w-full"
              src="/repair.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>Branding and Identity</h1>
            <p className="text-md ">
             Crafting unique brand identities and strategies that resonate with your target audience.
            </p>
          </div>
        </div>
        <div className=" flex flex-row justify-center items-center w-full md:w-1/3  bg-gray-50 px-5 py-7 radius">
          <div className="w-20 bg-red-500 rounded-full p-2 mb-3">
            <Image
              alt="unlock"
              width={100}
              height={100}
              className="w-full"
              src="/images/services/unlock.png"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h1>Maintenance and Upgrades</h1>
            <p className="text-md ">
            Regular maintenance and updates to keep your digital assets secure and up-to-date.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Services;

