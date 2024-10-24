import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-500 shadow-md">
      <div className="bg-gray-300 m-4 p-4 text-center rounded-md">
        <h1 className="text-2xl font-bold">Logo</h1>
      </div>
      <nav className="mt-4">
        <Link
          href="/"
          className="block py-2 px-4 text-gray-500 hover:bg-gray-200 text-center m-4 p-4 bg-white rounded-md font-bold text-xl"
        >
          Home
        </Link>
        <Link
          href="/vista-1"
          className="block py-2 px-4 text-gray-500 hover:bg-gray-200 text-center m-4 p-4 bg-white rounded-md font-bold text-xl"
        >
          Vista 1
        </Link>
        <Link
          href="/vista-2"
          className="block py-2 px-4 text-gray-500 hover:bg-gray-200 text-center m-4 p-4 bg-white rounded-md font-bold text-xl"
        >
          Vista 2
        </Link>
      </nav>
    </div>
  );
}
