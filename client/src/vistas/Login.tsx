import axios from "axios";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const result = await axios.post(
      "/user/login",
      {
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    );
    console.log(result);
  };

  return (
    <section className="w-full h-screen flex justify-center items-center gap-4 flex-col">
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
