"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function CountrySearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input
        type="text"
        placeholder="Escribe el país que deseas ver"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">Buscar</Button>
    </form>
  );
}
