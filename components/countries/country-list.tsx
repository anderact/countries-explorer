"use client";

import { useCountries } from "@/features/countries/hooks/use-countries";
import CountryCard from "./country-card";
import { Button } from "@/components/ui/button";
import CountrySearchBar from "@/components/countries/country-search";

export default function CountryList() {
  const {
    loading,
    error,
    countries,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useCountries();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSearch = (query: string) => {
    setSearch(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="space-y-8">
      <CountrySearchBar onSearch={handleSearch} initialSearch={search} />
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
