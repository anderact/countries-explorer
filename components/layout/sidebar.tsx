import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Logo</h1>
      </div>
      <nav className="mt-4">
        <Link
          href="/"
          className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
        >
          Home
        </Link>
        <Link
          href="/vista-1"
          className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
        >
          Vista 1
        </Link>
        <Link
          href="/vista-2"
          className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
        >
          Vista 2
        </Link>
      </nav>
    </div>
  );
}
