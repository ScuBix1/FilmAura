import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-full h-16 flex items-center justify-between px-6 shadow-md">
      <Link href="/">
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={32}
          height={32}
        />
      </Link>

      <nav>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/movies"
              className="hover:text-blue-500 transition-colors"
            >
              Tous les films
            </Link>
          </li>
          <li>
            <Link
              href="/watchlist"
              className="hover:text-blue-500 transition-colors"
            >
              Ma Watchlist
            </Link>
          </li>
          <li>
            <Link
              href="/favorites"
              className="hover:text-blue-500 transition-colors"
            >
              Favoris
            </Link>
          </li>
          <li>
            <Link href="/connection">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg transition">
                Se Connecter
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
