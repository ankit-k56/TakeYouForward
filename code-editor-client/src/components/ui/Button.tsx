import { space } from "postcss/lib/list";
import React from "react";

const Button = ({ info, isLoading }: { info: string; isLoading: boolean }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="text-white max-h-[60px] bg-[#ee4b2b] hover:bg-[#da4848] focus:ring-4 focus:outline-none focus:ring-[#da4848e4] font-medium rounded-lg text-sm px-4 py-2 text-center   "
    >
      {isLoading ? (
        <span className="animate-spin">Loading...</span>
      ) : (
        <span>{info}</span>
      )}
    </button>
  );
};

export default Button;
