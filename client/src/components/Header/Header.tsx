import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";

export default function Header() {
  return (
    <header>
      <NavbarMobile />
      <NavbarDesktop />
    </header>
  );
}
