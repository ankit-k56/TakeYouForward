"use client";

import { RxHamburgerMenu } from "react-icons/rx";

import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-white dark:bg-gray-900  w-full z-20   border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          TakeUForward
        </span>

        <div className="flex  space-x-3 md:space-x-0 ">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
