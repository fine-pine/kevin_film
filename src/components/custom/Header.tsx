import { ROUTER } from "@/src/constants";
import Link from "next/link";

export default async function Component() {
  return (
    <header className="w-full pt-16 flex justify-between items-end">
      <Link className="text-2xl font-medium" href="/">
        Kevin Film
      </Link>
      <nav>
        <ul key={0} className="flex gap-8">
          {ROUTER.map((route, idx) => (
            <li>
              <Link key={idx} href={route.path}>
                {route.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
