"use client";
import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { Submission } from "../../../types/submit";
import { stdout } from "process";

const SubmissionTable = () => {
  const [submissions, getSubmissions] = useState<Submission[]>([]);
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await fetch("http://localhost:3000/submissions");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonResponse = await response.json();
        getSubmissions(jsonResponse.submissions);
        // console.log(jsonResponse);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubmission();
  }, []);

  // const submissions: any = await fetch("http://localhost:3000/submissions")
  //   .then((res) => res.json())
  //   .catch((err) => console.error(err));

  // console.log(submissions);

  return (
    <div className="relative  overflow-x-auto">
      <table className="w-full text-sm text-left  text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Code
            </th>
            <th scope="col" className="px-6 py-3">
              Language
            </th>
            <th scope="col" className="px-6 py-3">
              stdin
            </th>
            <th scope="col" className="px-6 py-3">
              stdout
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => {
            return (
              <TableRow
                key={index}
                username={submission.username}
                code={submission.code}
                language={submission.language}
                stdin={submission.stdin}
                stdout={submission.stdout}
              />
            );
          })}
          {/* <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow /> */}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
