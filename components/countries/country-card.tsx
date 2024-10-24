import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function CountryCard({ country }: { country: any }) {
  return (
    <Card>
      <Image
        src="https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt={country.name}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-bold">{country.name}</h2>
        </div>
        <p className="text-gray-600">{country.continent.name}</p>
      </CardContent>
    </Card>
  );
}
