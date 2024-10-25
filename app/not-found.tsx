import Image from "next/image";
import NotFound from "@/app/not-found.png";

export default function NotFoundComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image src={NotFound} alt="oops" />
    </div>
  );
}
