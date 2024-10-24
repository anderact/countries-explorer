"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GetCountriesQuery } from "../../generated/graphql";

type Country = GetCountriesQuery["countries"][0];

export default function CountryCard({ country }: { country: Country }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        className="overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={country.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={`${country.name} flag`}
              width={20}
              height={15}
            />
            <h2 className="text-xl font-bold">{country.name}</h2>
          </div>
          <p className="text-gray-600">{country.continent.name}</p>
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
