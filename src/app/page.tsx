"use client";

import { useEffect, useState } from "react";
import { getFilteredAdvocates } from "@/app/utils";
import type { Advocate } from "@/app/types";
import ErrorBoundary from "@/app/components/ErrorBoundary";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAdvocates = async () => {
      const response = await fetch("/api/advocates");
      const jsonResponse = (await response.json()) as { data: Advocate[] };
      setAdvocates(jsonResponse.data);
    };

    fetchAdvocates();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  // Don't keep this in state, it is computed based on the search term
  const filteredAdvocates = getFilteredAdvocates(advocates, searchTerm);

  return (
    <ErrorBoundary>
      <main style={{ margin: "24px" }}>
        <h1>Solace Advocates</h1>

        <p>Search</p>
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
            {filteredAdvocates.map((advocate) => {
              return (
                <tr key={advocate.id}>
                  <td>{advocate.firstName}</td>
                  <td>{advocate.lastName}</td>
                  <td>{advocate.city}</td>
                  <td>{advocate.degree}</td>
                  <td>{advocate.specialties.join(", ")}</td>
                  <td>{advocate.yearsOfExperience}</td>
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
