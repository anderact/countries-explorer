"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GetCountriesQuery } from "../../generated/graphql";
import { useCountryImage } from "@/features/countries/api/unsplash-api";
import NotFoundImage from "@/app/not-found.png";
import { CountryDetailsPanel } from "@/components/countries/country-details";

type Country = GetCountriesQuery["countries"][0];

interface CountryCardProps {
  country: Country;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function CountryCard({
  country,
  isSelected,
  onSelect,
}: CountryCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { imageUrl, isLoading } = useCountryImage(country.name);

  const handleClick = () => {
    setIsOpen(true);
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <>
      <Card
        className={`overflow-hidden cursor-pointer rounded-[2.25rem] shadow-xl ${
          isSelected ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={handleClick}
      >
        {isLoading ? (
          <Skeleton className="w-full h-48" />
        ) : (
          <Image
            src={imageUrl || NotFoundImage}
            alt={country.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
        )}
        <CardContent className="p-4">
          <div className="flex items-center gap-4 mb-2">
            <Image
              src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
              alt={`${country.name} flag`}
              width={50}
              height={25}
              className="w-14 h-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-blue-500">
                {country.name}
              </h2>
              <p className="text-gray-600">{country.continent.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <CountryDetailsPanel
        country={country}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
