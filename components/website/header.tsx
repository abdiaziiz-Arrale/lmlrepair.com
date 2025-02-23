"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ServicesCardsComponent from "@/app/services/ServicesCardsComponent";

export const Navlink = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "/services",
    title: "Services",
  },
  {
    id: "/blogs/post", //Linked to productCategories
    title: "Blogs",
  },
  {
    id: "/contactus",
    title: "Contact Us",
  },
];

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
    if (!toggleMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  const handleSetActivePage = (title: any, e: any) => {
    e.preventDefault();
    if (title !== activePage) {
      setActivePage(title);
    }
  };

  return (
    <nav className="fixed top-0 z-20 w-full">
      {/* Desktop and Tablet screen  */}
      <div
        className={`mx-auto md:mx-0 bg-white ${
          scrolled ? " shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between grid-col-1 md:grid-col-3 mx-5 lg:px-16 ">
          <div className="flex justify-between items-center w-full my-3 ">
            <div>
              <Link href="/">
                <Image
                  src="/newlogo.png"
                  alt="logo"
                  width={100}
                  height={100}
                  //className="w-9 md:w-12"
                />
              </Link>
            </div>

            <div className="hidden lg:flex gap-5 pt-4 text-md tracking-wider">
              {Navlink.map((nav, index) => (
                <ul
                  key={index}
                  className={`text-xl ${
                    activePage === nav.title ? " text-red-500" : ""
                  } ${
                    index === Navlink.length - 1
                      ? " text-white bg-red-500 py-2 px-3 ml-64 transform transition-transform duration-300 hover:translate-y-1 "
                      : ""
                  }`}
                  onClick={(e) => {
                    handleSetActivePage(nav.title, e);
                  }}
                >
                  {<Link href={`${nav.id} `}> {nav.title}</Link>}
                </ul>
              ))}
            </div>
          </div>

          <div className="flex gap-6 ">
            <div className="lg:hidden flex items-center ">
              {!toggleMenu ? (
                <Image
                  src="/images/header/menu.png"
                  alt="menu"
                  width={100}
                  height={100}
                  className="w-7"
                  onClick={toggleMenuHandler}
                />
              ) : (
                <Image
                  src="/images/header/close.png"
                  alt="close"
                  width={100}
                  height={100}
                  className="w-5"
                  onClick={toggleMenuHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* mobile Screen */}
      <div
        className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12   origin-top duration-700 ${
          !toggleMenu ? "h-0" : "h-full"
        }`}
      >
        <div className="px-8 pt-10">
          <div className="flex flex-col gap-4 tracking-wider">
            {Navlink.map((nav, index) => (
              <ul
                key={index}
                className={`w-full mt-7 flex items-center text-md font-semibold ${
                  index === Navlink.length - 1
                    ? "bg-red-600 flex justify-center text-center py-2 tracking-wider text-xl transform transition-transform duration-300 hover: translate-x-4"
                    : ""
                }`}
                onClick={() => {
                  setActivePage(nav.title), setIsOpen((prev) => !prev);
                }}
              >
                {<Link href={`${nav.id} `}> {nav.title}</Link>}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
