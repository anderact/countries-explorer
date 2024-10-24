"use client";

import { useState, useMemo } from "react";
import { useGetCountriesQuery } from "../../../generated/graphql";

export function useCountries() {
  const { loading, error, data } = useGetCountriesQuery();
  const [search, setSearch] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredCountries = useMemo(() => {
    if (!data?.countries) return [];
    return data.countries.filter((country) => {
      const matchesSearch = country.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesContinent = selectedContinent
        ? country.continent.code === selectedContinent
        : true;
      return matchesSearch && matchesContinent;
    });
  }, [data, search, selectedContinent]);

  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCountries.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCountries, currentPage]);

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  return {
    loading,
    error,
    countries: paginatedCountries,
    continents: data?.continents || [],
    search,
    setSearch,
    selectedContinent,
    setSelectedContinent,
    currentPage,
    setCurrentPage,
    totalPages,
  };
}
