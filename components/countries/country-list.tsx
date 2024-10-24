"use client";

import { useCountries } from "@/features/countries/hooks/use-countries";
import CountryCard from "./country-card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function CountryList() {
  const {
    loading,
    error,
    countries,
    // continents,
    // selectedContinent,
    // setSelectedContinent,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useCountries();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-4">
      {/* <Select value={selectedContinent} onValueChange={setSelectedContinent}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by continent" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Continents</SelectItem>
          {continents.map((continent) => (
            <SelectItem key={continent.code} value={continent.code}>
              {continent.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <CountryCard key={country.code} country={country} />
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
