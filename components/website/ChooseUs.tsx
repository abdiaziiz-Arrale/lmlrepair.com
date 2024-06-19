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
            Trust Our Experts for Reliable Electronic Repair Services
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
            <h1>HIGH-QUALITY PARTS</h1>
            <p className="text-md mt-3">
              LML Repair only uses high-quality OEM and aftermarket parts for
              repairs
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
            <h1>LOST COST DIAGNOSIS</h1>
            <p className="text-md mt-3">
              Not sure what’s wrong? We’ll diagnose your issue at a low cost.
              With fix, no fee
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
            <h1>CERTIFIED TECHNICIANS</h1>
            <p className="text-md mt-3">
              Knowledgeable, passionate service from qualified and trained
              experts.
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
            <h1>60 DAY WARRANTY</h1>
            <p className="text-md mt-3">
              All repairs come with a 60 day Warranty for your peace of mind
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
            <h1>BEST REPAIR SERVICE</h1>
            <p className="text-md mt-3">
              LML Repair offers Seattle’s friendliest, fastest repair service
              with expert repairs for a variety of devices.
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
