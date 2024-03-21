import React from "react";

const LanguageSelector = () => {
  return (
    <div className="flex justify-between max-w-[1000px] w-[60vw]">
      <div>
        <label
          htmlFor="user_name"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          User Name
        </label>
        <input
          type="text"
          id="user_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Ennter your user name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="countries"
          className="block mb-1 text-sm font-medium text-gray-900 "
        >
          Choose a Language
        </label>
        <select
          id="countries"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value={52}>C++</option>
          <option value={69}>Java</option>
          <option value="FR">Python</option>
          <option value="DE">JavaScript</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
