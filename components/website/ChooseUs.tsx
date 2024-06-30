"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion";
import Image from "next/image";

function ChooseUs() {
  return (
    <>
      <motion.div
        variants={staggerContainer(0.5, 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="flex flex-col mx-5 md:mx-16 my-16"
      >
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="text-center mb-10"
        >
          <h1 className="text-yellow-300 tracking-wider">why choose Us?</h1>
          <h1 className="text-xl md:text-2xl tracking-wider">
            Trust Our Experts for Reliable Software and Digital Solutions
          </h1>
        </motion.div>
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="flex flex-wrap justify-center items-center gap-3 mt-5"
        >
          <div className="flex flex-col justify-center items-center w-full md:w-1/4  bg-yellow-50 px-10 py-7 radius1">
            <div className="w-14 bg-yellow-300 rounded-full p-4 mb-3">
              <Image
                alt="repair"
                width={100}
                height={100}
                className="w-full"
                src="/repair.png"
              />
            </div>
            <h1>Expertise in Digital Solutions</h1>
            <p className="text-md mt-3">
            With specialized knowledge in software development and digital marketing, we deliver tailored solutions that align with your business goals.
            </p>
          </div>
          <div className=" flex flex-col justify-center items-center w-full md:w-1/4  bg-gray-50 px-10 py-7 radius1">
            <div className="w-14 bg-yellow-300 rounded-full p-4 mb-3">
              <Image
                alt="repair"
                width={100}
                height={100}
                className="w-full"
                src="/repair.png"
              />
            </div>
            <h1>Innovative Approach</h1>
            <p className="text-md mt-3">
            We combine cutting-edge technology with creative expertise to turn your ideas into impactful digital solutions that drive results.
            </p>
          </div>
          <div className=" flex flex-col justify-center items-center w-full md:w-1/4  bg-yellow-50 px-10 py-7 radius1">
            <div className="w-14 bg-yellow-300 rounded-full p-4 mb-3">
              <Image
                alt="repair"
                width={100}
                height={100}
                className="w-full"
                src="/repair.png"
              />
            </div>
            <h1>Proven Track Record</h1>
            <p className="text-md mt-3">
            Over years of operation, we've successfully empowered startups and established brands alike, helping them achieve their digital objectives.
            </p>
          </div>
          <div className=" flex flex-col justify-center items-center w-full md:w-1/4  bg-yellow-50 px-10 py-7 radius1">
            <div className="w-14 bg-yellow-300 rounded-full p-4 mb-3">
              <Image
                alt="repair"
                width={100}
                height={100}
                className="w-full"
                src="/repair.png"
              />
            </div>
            <h1>Comprehensive Services</h1>
            <p className="text-md mt-3">
            From initial consultation to ongoing support, we offer a full spectrum of services including software development, digital marketing, UI/UX design, and more.
            </p>
          </div>
          <div className=" flex flex-col justify-center items-center w-full md:w-1/4  bg-gray-50 px-10 py-7 radius1">
            <div className="w-14 bg-yellow-300 rounded-full p-4 mb-3">
              <Image
                alt="repair"
                width={100}
                height={100}
                className="w-full"
                src="/repair.png"
              />
            </div>
            <h1>Commitment to Excellence</h1>
            <p className="text-md mt-3">
            We're committed to delivering quality and reliability in every project, backed by transparent communication and dedicated support.
            </p>
          </div>
          <div className=" flex flex-col justify-center items-center w-full md:w-1/4  bg-yellow-50 px-10 py-7 radius1">
            <div className="w-14 bg-yellow-300 rounded-full p-4 mb-3">
              <Image
                alt="repair"
                width={100}
                height={100}
                className="w-full"
                src="/repair.png"
              />
            </div>
            <h1>CONVENIENT LOCATIONS </h1>
            <p className="text-md mt-3">
              With multiple locations across the city, finding a nearby LML
              Repair shop is easy and convenient for you
            </p>
          </div>
        </motion.div>
      </motion.div>
      <Image
        alt="wave"
        className="w-full "
        width={100}
        height={100}
        src="/wave.svg"
      />
    </>
  );
}

export default ChooseUs;
