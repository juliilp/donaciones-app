import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

export default function NavbarDesktop() {
  const { user, isAuthenticate, handlerCerrarSesion } = useAuth();

  return (
    <>
      {isAuthenticate ? (
        <ul className="hidden md:flex items-center w-full justify-around px-6 my-4">
          <li>
            <img src={user?.foto.secure_url} alt="ImagenPerfil" />
          </li>
          <li>{user?.nombre}</li>
          <li>
            <button onClick={handlerCerrarSesion}>Cerrar sesion</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/Registro">Registro</Link>
          </li>
        </ul>
      )}
    </>
  );
}
