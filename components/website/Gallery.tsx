"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion";
import Image from "next/image";

export default function Gallery() {
  return (
    <motion.div
      variants={staggerContainer(0.5, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col grid-row-2 mx-5  md:mx-24 my-14 justify-center items-center  "
    >
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="text-center mb-14"
      >
        <h1 className="text-yellow-300 tracking-wider">gallery</h1>
        <h1 className="text-xl md:text-2xl tracking-wider">
          Explore our Repair Gallery
        </h1>
      </motion.div>
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="flex flex-wrap grid-col-2 md:grid-cols-3 gap-4 justify-center items-center"
      >
        <div className="flex md:flex-col gap-4">
          <Image
            alt="gallery"
            width={300}
            height={300}
            className="rounded-lg w-36 h-36 md:w-72 md:h-80 "
            src="/images/gallery/pic1.jpg"
          />
          <Image
            alt="gallery"
            width={300}
            height={300}
            className="rounded-lg  w-36 h-36 md:w-72 md:h-52 "
            src="/images/gallery/pic2.jpg"
          />
        </div>
        <div className="flex md:flex-col gap-4">
          <Image
            alt="gallery"
            width={300}
            height={300}
            className="rounded-lg w-36 h-36 md:w-72 md:h-52 "
            src="/images/gallery/pic4.jpg"
          />
          <Image
            alt="gallery"
            width={300}
            height={300}
            className="rounded-lg  w-36 h-36 md:w-72 md:h-80 "
            src="/images/gallery/pic3.jpg"
          />
        </div>

        <div className="flex md:flex-col gap-4">
          <Image
            alt="gallery"
            width={300}
            height={300}
            className="rounded-lg w-36 h-36 md:w-72 md:h-80 "
            src="/images/gallery/pic5.jpg"
          />
          <Image
            alt="gallery"
            width={300}
            height={300}
            className="rounded-lg  w-36 h-36 md:w-72 md:h-52 "
            src="/images/gallery/pic1.jpg"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
