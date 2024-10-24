import CountryList from "@/components/countries/country-list";
import CountrySearch from "@/components/countries/country-search";

export default function Home() {
  return (
    <div className="space-y-4">
      <CountrySearch />
      <CountryList />
    </div>
  );
}
