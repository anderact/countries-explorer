"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { GetCountriesQuery } from "../../generated/graphql";
import { useCountryImage } from "@/features/countries/api/unsplash-api";
import { useState } from "react";
import NotFoundImage from "@/app/not-found.png";

type Country = GetCountriesQuery["countries"][0];

export default function CountryCard({ country }: { country: Country }) {
  const [isOpen, setIsOpen] = useState(false);
  const { imageUrl, isLoading } = useCountryImage(country.name);

  return (
    <>
      <Card
        className="overflow-hidden cursor-pointer rounded-[2.25rem] shadow-xl"
        onClick={() => setIsOpen(true)}
      >
        {isLoading ? (
          <Skeleton className="w-full h-48" />
        ) : (
          <Image
            src={imageUrl || NotFoundImage}
            alt={country.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700"
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{country.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>
              <strong>Capital:</strong> {country.capital}
            </p>
            <p>
              <strong>Currency:</strong> {country.currency}
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              {country.languages.map((lang) => lang.name).join(", ")}
            </p>
            {country.states && country.states.length > 0 && (
              <div>
                <strong>States:</strong>
                <ul className="list-disc list-inside">
                  {country.states.map((state) => (
                    <li key={state.name}>{state.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
