"use client";
import MobileNav from "./MobileNav";

import { RxHamburgerMenu } from "react-icons/rx";

import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  return (
    <nav className=" bg-gray-900  w-full z-20   border-b  border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
          TakeUForward
        </span>
        <MobileNav isVisible={isVisible} />

        <div className="flex  space-x-3 md:space-x-0 ">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <RxHamburgerMenu className="text-xl" />
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  bg-gray-800 md:bg-gray-900 border-gray-700">
            <li>
              <a
                href="/"
                className={`block py-2 px-3 text-white transition hover:hover:scale-[1.1] bg-[#ee4b2b] rounded md:bg-transparent ${
                  pathname == "/" && "md:text-[#ee4b2b]"
                } md:p-0`}
                aria-current="page"
              >
                Editor
              </a>
            </li>
            <li>
              <a
                href="/get-codes"
                className={`block py-2 px-3 text-white transition hover:scale-[1.1] bg-[#ee4b2b] rounded md:bg-transparent ${
                  pathname == "/get-codes" && "md:text-[#ee4b2b]"
                } md:p-0`}
              >
                Get codes
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
