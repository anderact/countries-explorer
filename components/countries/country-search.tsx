"use client";

import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

interface CountrySearchBarProps {
  onSearch: (query: string) => void;
  initialSearch: string;
}

export default function CountrySearchBar({
  onSearch,
  initialSearch,
}: CountrySearchBarProps) {
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    onSearch(newSearch); // Trigger search on each input change for real-time filtering
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto">
      <Input
        type="text"
        placeholder="Escribe el país que deseas ver"
        value={search}
        onChange={handleInputChange}
        className="w-full pl-4 pr-20 py-3 rounded-full shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-90"
      />
      <Button
        type="submit"
        className="absolute right-1 top-1 bottom-1 px-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-200"
      >
        <Search className="w-5 h-5 mr-2" />
        Buscar
      </Button>
    </form>
  );
}
