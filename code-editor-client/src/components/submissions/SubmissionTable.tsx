"use client";
import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { Submission } from "../../../types/submit";
import { toast } from "sonner";

const SubmissionTable = () => {
  const [submissions, getSubmissions] = useState<Submission[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://take-you-forward.vercel.app/submissions"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonResponse = await response.json();
        getSubmissions(jsonResponse.submissions);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("Internal server error");
        console.error(err);
      }
    };
    fetchSubmission();
  }, []);

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
        {isLoading && <div>Loading...</div>}
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
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
