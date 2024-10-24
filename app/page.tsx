import dynamic from "next/dynamic";

const CountryList = dynamic(
  () => import("@/components/countries/country-list"),
  { ssr: false }
);
const CountrySearch = dynamic(
  () => import("@/components/countries/country-search"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="space-y-4">
      <CountrySearch />
      <CountryList />
    </div>
  );
}
