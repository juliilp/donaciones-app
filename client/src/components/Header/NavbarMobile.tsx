import { IAuthProvider } from "../../interface/AuthProvider.interface";

export default function NavbarMobile({ user }: IAuthProvider) {
  console.log(user);
  return (
    <nav className="flex md:hidden ">
      <h2>Navbar mobile</h2>
    </nav>
  );
}
