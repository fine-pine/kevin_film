import { ThemeSwitcher } from "../theme-switcher";

export default function Component() {
  return (
    <footer className="w-full gap-8 py-16 flex items-center justify-center border-t text-xs">
      <p>Kevin Film ⓒ All Rights Reserved</p>
      <ThemeSwitcher />
    </footer>
  );
}
