import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-white text-2xl font-bold tracking-tight">
        Rubik<span className="text-blue-500">-S</span>
      </Link>
      <div className="flex gap-6 text-sm text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <Link href="/input" className="hover:text-white transition-colors">
          Solve
        </Link>
      </div>
    </nav>
  );
}