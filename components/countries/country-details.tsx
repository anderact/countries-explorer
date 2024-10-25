"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { GetCountriesQuery } from "../../generated/graphql";
import { Button } from "@/components/ui/button";
import { useCountryImage } from "@/features/countries/api/unsplash-api";

type Country = GetCountriesQuery["countries"][0];

interface CountryDetailsPanelProps {
  country: Country;
  isOpen: boolean;
  onClose: () => void;
}

export function CountryDetailsPanel({
  country,
  isOpen,
  onClose,
}: CountryDetailsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { imageUrl } = useCountryImage(country.name);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg z-50 overflow-y-auto transition-transform duration-300 ease-in-out transform translate-x-0">
      <div ref={panelRef} className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 pl-8 space-y-4">
          <div className="flex gap-1">
            <Image
              src={imageUrl || ""}
              alt={`${country.name} flag`}
              width={160}
              height={80}
              className="w-full h-auto object-cover rounded-lg"
            />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Image
                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                alt={`${country.name} flag`}
                width={50}
                height={25}
                className="w-14 h-full object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-blue-500">
                  {country.name}
                </h1>
                <p>{country.continent.name}</p>
              </div>
            </div>
            <p className="text-xl">
              <strong className="text-blue-500">Capital: </strong>{" "}
              {country.capital}
            </p>
            <p className="text-xl">
              <strong className="text-blue-500">Language: </strong>{" "}
              {country.languages.map((lang) => lang.name).join(", ")}
            </p>
            <p className="text-xl">
              <strong className="text-blue-500">Currency: </strong>{" "}
              {country.currency}
            </p>
            {country.states && country.states.length > 0 && (
              <div className="text-xl">
                <strong className="text-blue-500">Regions: </strong>
                <div className="mt-2 max-h-40 overflow-y-auto border rounded-md">
                  <ul className="mt-2 px-4">
                    {country.states.map((state) => (
                      <li className="text-sm py-1" key={state.name}>
                        {state.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
