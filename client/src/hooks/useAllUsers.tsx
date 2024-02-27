import { useEffect, useState } from "react";
import { IUser } from "../interface/IUser.interface";
import axios from "axios";

interface Autocompletado {
  users: IUser[];
  loading: boolean;
  error: boolean;
}

export default function useAllUsers(): Autocompletado {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function allUsers() {
      try {
        const res = await axios("/user");
        if (res.status === 200) {
          setLoading(false);
          setError(false);
          setUsers(res.data);
          return;
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    allUsers();
  }, []);
  return { loading, users, error };
}
