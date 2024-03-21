import React from "react";
import Link from "next/link";

const MobileNav = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={`flex flex-col gap-5 backdrop-blur-xl   z-50  w-[50vw] fixed  ${
        isVisible ? "left-0 " : "translate-x-[-110%]"
      }   top-[73px] p-5 py-6  transition-transform md:hidden  dark:border-r-0 duration-200  border-r-2 text-sm h-full`}
    >
      <Link href={"/"}>Editor</Link>
      <Link href={"/get-codes"}>Get Codes</Link>
    </div>
  );
};

export default MobileNav;
