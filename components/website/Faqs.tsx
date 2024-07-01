"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, planetVariants } from "../../utils/motion";
import Image from "next/image";
import Link from "next/link";

function Faqs() {
  return (
    <motion.div
      variants={staggerContainer(0.5, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col  md:flex-row justify-center items-center mx-5 md:mx-16 my-5 md:my-16 gap-16"
    >
      <motion.div
        variants={planetVariants("left")}
        className=" w-full md:w-1/2"
      >
        <Image
          alt="faq"
          width={400}
          height={400}
          className="w-full"
          src="/newfaq2.png"
        />
      </motion.div>
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="w-full md:w-1/2 px-5 bg-red-50 "
      >
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-5xl mt-5  text-red-500 tracking-wider">
            FAQ
          </h1>
          <h1 className="text-neutral-500 text-xl mt-3 tracking-wider">
            Frequenty asked questions
          </h1>
        </div>
        <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span> What digital marketing services do you offer?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
              Our services include SEO (Search Engine Optimization), PPC (Pay-Per-Click) advertising, social media marketing, content marketing, email marketing, and digital strategy consulting. We tailor our approach to meet your specific business goals and target audience.
              </p>
            </details>
          </div>
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>How do you approach software development projects?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
              We follow an agile development methodology, ensuring flexibility and responsiveness throughout the project lifecycle. Our process involves thorough requirements gathering, iterative development, rigorous testing, and continuous client feedback to deliver robust and scalable software solutions.
              </p>
            </details>
          </div>
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span> What industries do you specialize in?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
              We have extensive experience across various industries, including but not limited to technology startups, e-commerce, healthcare, finance, and education. Our adaptable solutions cater to the unique challenges and opportunities of each industry.
              </p>
            </details>
          </div>
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span> Can you help improve our digital presence and user experience?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
              Absolutely. We provide comprehensive UI/UX design services aimed at enhancing user engagement and satisfaction across your digital platforms. Our approach integrates user research, wireframing, prototyping, and iterative design improvements to achieve optimal results.
              </p>
            </details>
          </div>
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span> How do you measure the success of digital marketing campaigns?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
              We utilize advanced analytics tools to track key performance indicators (KPIs) such as website traffic, conversion rates, ROI (Return on Investment), and engagement metrics. These insights enable us to refine strategies and optimize campaigns for maximum effectiveness.
              </p>
            </details>
          </div>
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span> What sets your company apart from competitors?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
              Our commitment to innovation, personalized service, and a deep understanding of both technology and marketing landscapes distinguishes us. We prioritize building long-term partnerships, delivering tangible results, and staying ahead of industry trends.
              </p>
            </details>
          </div>
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span> How do we get started with LML Digitals?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
              Simply reach out to us through our contact form on our <Link href="/contact" className="underline text-blue-600">Contact us</Link> page. We'll discuss your specific needs and goals, and tailor a plan to kickstart your journey towards digital excellence.
              </p>
            </details>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Faqs;
