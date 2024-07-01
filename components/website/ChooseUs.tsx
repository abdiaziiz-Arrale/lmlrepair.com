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
            <h1>Expertise</h1>
            <p className="text-md mt-3">
            Benefit from our deep expertise in digital marketing and software development to achieve your business goals.
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
            <h1>Innovation</h1>
            <p className="text-md mt-3">
            Drive growth with our innovative approach to digital solutions that stay ahead of industry trends.
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
            <h1>Agile</h1>
            <p className="text-md mt-3">
            Stay adaptable with our agile approach, ensuring quick and effective solutions.
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
            <h1>Reliability</h1>
            <p className="text-md mt-3">
            Count on our proven track record of reliability, delivering consistent results and exceptional service.
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
            <h1>Excellence</h1>
            <p className="text-md mt-3">
            Experience excellence in every aspect of our services, from strategy formulation to execution and beyond.
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
            <h1>Transparency </h1>
            <p className="text-md mt-3">
            Trust in clear communication and open collaboration throughout our partnership.
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
