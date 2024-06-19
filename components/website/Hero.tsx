"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, planetVariants } from "../../utils/motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <motion.div
      variants={staggerContainer(0.5, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="mt-14 md:mt-24"
    >
      <div className="flex flex-col justify-center items-center md:flex-row grid-col-1 md:grid-cols-2 mx-5 md:mx-16   ">
        <motion.div
          variants={planetVariants("right")}
          className="sm:block md:hidden flex justify-center items-center w-full h-full "
        >
          <Image
            alt="hero"
            height={450}
            width={450}
            className="w-64  md:w-full md:h-full"
            src="/hero.png"
          />
        </motion.div>
        {/* Every screen */}
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="flex flex-col justify-center  w-full h-full p-2 md:p-5 pt-5 md:pt-28 pr-20"
        >
          <h1 className="text-4xl md:text-6xl mb-3 ">
            Electronic<span className="text-yellow-300"> Repair</span>
          </h1>
          <h4>
            Experience seamless electronic repair services. Our expert
            technicians ensure swift, reliable solutions, restoring your devices
            to optimal performance. Trust us with your repairs today.
          </h4>
          <Link
            href="/bookings"
            className="bg-yellow-300 px-2 py-2 flex justify-center items-center w-32 mt-10"
          >
            Book Now
          </Link>
        </motion.div>
        {/* Blocks on medium and large screen */}
        {/* Blocks on medium and large screen */}

        <motion.div
          variants={planetVariants("right")}
          className="hidden md:flex justify-center items-center w-full h-full "
        >
          <Image
            alt="hero"
            width={450}
            height={450}
            className="w-96"
            src="/hero.png"
          />
        </motion.div>
      </div>
      {/* Wave image  */}
      <motion.div variants={fadeIn("up", "tween", 0.2, 1)}>
        <Image
          alt="wave"
          width={100}
          height={100}
          className="w-full"
          src="/wave.svg"
        />
      </motion.div>
    </motion.div>
  );
}
