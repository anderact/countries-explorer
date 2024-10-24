"use client";

import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@/features/countries/api/get-countries";
import CountryCard from "./country-card";

export default function CountryList() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.countries.map((country: any) => (
        <CountryCard key={country.code} country={country} />
      ))}
    </div>
  );
}
