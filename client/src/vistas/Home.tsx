import CardUserHome from "../components/CardUserHome";
import useAllUsers from "../hooks/useAllUsers";

export default function Home() {
  const { error, loading, users } = useAllUsers();

  if (error) {
    return <h2>Error al pedir usuarios</h2>;
  }
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <main>
      {users.map((u, index) => {
        return (
          <CardUserHome
            nombre={u.nombre}
            fotoPerfil={u.fotoPerfil}
            description={u.description}
            id={u._id}
            key={index}
          />
        );
      })}
    </main>
  );
}
