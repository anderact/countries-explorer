import { useQuery } from "@apollo/client";
import { useState, useMemo } from "react";
import { GET_COUNTRIES } from "../api/get-countries";

export function useCountries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [search, setSearch] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");

  const filteredCountries = useMemo(() => {
    if (!data) return [];
    return data.countries.filter((country: any) => {
      const matchesSearch = country.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesContinent = selectedContinent
        ? country.continent.name === selectedContinent
        : true;
      return matchesSearch && matchesContinent;
    });
  }, [data, search, selectedContinent]);

  return {
    loading,
    error,
    countries: filteredCountries,
    search,
    setSearch,
    selectedContinent,
    setSelectedContinent,
  };
}
