import { IAuthProvider } from "../../interface/AuthProvider.interface";

export default function NavbarDesktop({ user }: IAuthProvider) {
  console.log(user);
  return (
    <nav className="hidden md:flex">
      <h2>Navbar desktop</h2>
    </nav>
  );
}
