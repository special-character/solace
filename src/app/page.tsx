"use client";

import "@/app/page.css";
import { useEffect, useState } from "react";
import { getFilteredAdvocates } from "@/app/utils";
import type { Advocate } from "@/app/types";
import ErrorBoundary from "@/app/components/ErrorBoundary";

const fetchAdvocates = async (searchTerm: string) => {
  const response = await fetch(`/api/advocates?searchTerm=${searchTerm}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = (await response.json()) as { data: Advocate[] };

  return jsonResponse.data;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const advocates = await fetchAdvocates(searchTerm);
    setAdvocates(advocates);
  };

  return (
    <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
      <main>
        <h1>Solace Advocates</h1>

        <input placeholder="Search for an advocate..." onChange={onChange} />

        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Degree</th>
              <th>Specialties</th>
              <th>Years of Experience</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {advocates.map((advocate) => {
              return (
                <tr key={advocate.id}>
                  <td>{advocate.firstName}</td>
                  <td>{advocate.lastName}</td>
                  <td>{advocate.city}</td>
                  <td>{advocate.degree}</td>
                  <td>{advocate.specialties.join(", ")}</td>
                  <td className="experience">{advocate.yearsOfExperience}</td>
                  <td>{advocate.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </ErrorBoundary>
  );
}
