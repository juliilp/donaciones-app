import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

export default function NavbarDesktop() {
  const { user, isAuthenticate, handlerCerrarSesion } = useAuth();

  return (
    <>
      {isAuthenticate ? (
        <ul className="hidden md:flex items-center w-full justify-around px-6 my-4">
          <li>
            <Link to="/perfil">
              <img
                src={user?.foto.secure_url}
                alt="ImagenPerfil"
                className="rounded-full size-16"
              />
            </Link>
          </li>
          <Link to="/perfil">
            <li>{user?.nombre}</li>
          </Link>
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
