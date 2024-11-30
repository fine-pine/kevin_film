import { ThemeSwitcher } from "../theme-switcher";

export default function Component() {
  return (
    <footer className="flex items-center justify-between w-full pt-16">
      <p className="text-xs">Kevin Film ⓒ All Rights Reserved</p>
      <ThemeSwitcher />
    </footer>
  );
}
