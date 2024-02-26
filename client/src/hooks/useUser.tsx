import { useContext } from "react";
import { userContext } from "../context/UserProvider";
import { IUserProvider } from "../interface/IUserProvider";

export default function useUser(): IUserProvider {
  const users = useContext(userContext);
  if (!users) {
    throw new Error("useUser debe ser utilizado dentro de un UserProvider");
  }
  return users;
}
