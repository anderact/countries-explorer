"use client";

import { useState } from "react";
import { useCountries } from "@/features/countries/hooks/use-countries";
import CountryCard from "@/components/countries/country-card";
import { Button } from "@/components/ui/button";
import CountrySearchBar from "@/components/countries/country-search";
import LoadingComponent from "@/components/layout/loading-custom";

export default function CountryList() {
  const {
    loading,
    error,
    countries,
    continents,
    search,
    setSearch,
    setSelectedContinent,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useCountries();

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  if (loading) return <LoadingComponent />;
  if (error) return <p>Error: {error.message}</p>;

  const handleSearch = (query: string) => {
    setSearch(query);
    setCurrentPage(1);
  };

  const handleContinentFilter = (selectedContinents: string[]) => {
    setSelectedContinent(selectedContinents.join(","));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      <CountrySearchBar
        onSearch={handleSearch}
        onContinentFilter={handleContinentFilter}
        initialSearch={search}
        continents={continents}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <CountryCard
            key={country.code}
            country={country}
            isSelected={selectedCountry === country.code}
            onSelect={() => setSelectedCountry(country.code)}
          />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="w-full sm:w-auto"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
