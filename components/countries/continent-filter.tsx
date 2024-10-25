import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ContinentFilterProps {
  continents: { code: string; name: string }[];
  selectedContinents: string[];
  onContinentToggle: (continentCode: string) => void;
  onClear: () => void;
}

const continentFlags: { [code: string]: string } = {
  AF: "svg/continents/af.svg",
  AN: "svg/continents/an.svg",
  AS: "svg/continents/as.svg",
  EU: "svg/continents/eu.svg",
  NA: "svg/continents/na.svg",
  OC: "svg/continents/oc.svg",
  SA: "svg/continents/sa.svg",
};

export function ContinentFilter({
  continents,
  selectedContinents,
  onContinentToggle,
  onClear,
}: ContinentFilterProps) {
  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-3xl py-4 px-8 mt-4 z-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">Filtrar por continentes</h3>
        <Button
          variant="ghost"
          onClick={onClear}
          className="text-blue-500 text-xl"
        >
          Limpiar
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {continents.map((continent) => {
          const isSelected = selectedContinents.includes(continent.code);
          return (
            <Button
              key={continent.code}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onContinentToggle(continent.code)}
              className="h-28 flex flex-col items-center justify-between p-2"
            >
              <div className="w-16 h-16 relative">
                <Image
                  src={continentFlags[continent.code] || "/not-found.png"}
                  alt={continent.name}
                  layout="fill"
                  objectFit="contain"
                  className={isSelected ? "invert" : ""}
                />
              </div>
              <span className="text-sm text-center mt-1">{continent.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
