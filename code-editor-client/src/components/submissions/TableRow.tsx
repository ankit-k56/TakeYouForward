import React from "react";
import { Submission } from "../../../types/submit";

const TableRow: React.FC<Submission> = ({
  username,
  code,
  language,
  stdin,
  stdout,
}) => {
  return (
    <tr className="bg-white border-b ">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        {username}
      </th>
      <td className="px-6 py-4 w-[35%]">{code}</td>
      <td className="px-6 py-4">{language}</td>
      <td className="px-6 py-4">{stdin}</td>
      {stdout && <td className="px-6 py-4">{stdout}</td>}
    </tr>
  );
};

export default TableRow;
