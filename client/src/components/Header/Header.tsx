import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
import useAuth from "../../hooks/useAuth";
export default function Header() {
  const { user } = useAuth();

  return (
    <header>
      <NavbarMobile user={user} />
      <NavbarDesktop user={user} />
    </header>
  );
}
