import dynamic from "next/dynamic";

const CountryList = dynamic(
  () => import("@/components/countries/country-list"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="mx-8 py-8">
      <CountryList />
    </div>
  );
}
