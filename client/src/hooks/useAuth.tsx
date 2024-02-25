import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { IAuthProvider } from "../interface/AuthProvider.interface";
export default function useAuth(): IAuthProvider {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
}
