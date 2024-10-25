"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ContinentFilter } from "@/components/countries/continent-filter";

interface CountrySearchBarProps {
  onSearch: (query: string) => void;
  onContinentFilter: (continents: string[]) => void;
  initialSearch: string;
  continents: { code: string; name: string }[];
}

export default function CountrySearchBar({
  onSearch,
  onContinentFilter,
  initialSearch,
  continents,
}: CountrySearchBarProps) {
  const [search, setSearch] = useState(initialSearch);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    onSearch(newSearch);
  };

  const handleContinentToggle = (continentCode: string) => {
    setSelectedContinents((prev) => {
      const newSelection = prev.includes(continentCode)
        ? prev.filter((c) => c !== continentCode)
        : [...prev, continentCode];
      onContinentFilter(newSelection);
      return newSelection;
    });
  };

  const handleClearContinents = () => {
    setSelectedContinents([]);
    onContinentFilter([]);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto" ref={searchBarRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="bg-white rounded-3xl shadow-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="w-full mb-4 sm:mb-0 sm:mr-4">
              <label
                htmlFor="country-search"
                className="block text-xl font-medium text-gray-700 mb-2 ml-4 leading-none"
              >
                País
              </label>
              <Input
                id="country-search"
                type="text"
                placeholder="Escribe el país que deseas ver"
                value={search}
                onChange={handleInputChange}
                onFocus={() => setIsFilterOpen(true)}
                className="w-full pl-4 pr-4 py-2 text-sm bg-transparent border-b-2 border-transparent focus:border-blue-500 focus:ring-0 transition-colors duration-200"
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto rounded-3xl bg-blue-500 hover:bg-blue-600 text-white text-lg transition-colors duration-200 flex items-center justify-center"
              size="lg"
            >
              <Search className="w-6 h-6 mr-2" />
              <span>Buscar</span>
            </Button>
          </div>
        </div>
      </form>
      {isFilterOpen && (
        <ContinentFilter
          continents={continents}
          selectedContinents={selectedContinents}
          onContinentToggle={handleContinentToggle}
          onClear={handleClearContinents}
        />
      )}
    </div>
  );
}
