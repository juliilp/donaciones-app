import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { handlerLogin } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticate } = useAuth();
  useEffect(() => {
    if (isAuthenticate) {
      navigate("/");
    }
  }, [isAuthenticate]);

  return (
    <section className="w-full h-screen flex justify-center items-center gap-4 flex-col">
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit(handlerLogin)}
        className="flex flex-col gap-6 border border-black p-6"
      >
        <input type="email" {...register("email")} placeholder="email" />
        <input
          type="password"
          {...register("password")}
          placeholder="contraseña"
        />
        <button>Enviar</button>
      </form>
    </section>
  );
}
