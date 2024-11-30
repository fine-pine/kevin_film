import { ROUTER } from "../../../app/constants";
import Link from "next/link";

export default function Component() {
  return (
    <header className="mt-16 flex justify-between">
      <Link className="text-2xl font-medium" href="/">
        Kevin Film
      </Link>
      <nav>
        <ul className="flex gap-8 text-base">
          {ROUTER.map((route) => (
            <li>
              <Link key={route.title} href={route.path}>
                {route.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
