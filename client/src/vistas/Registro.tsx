import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";

export default function Registro() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = await axios.post(
      "/user/createUser",
      {
        nombre: data.nombre,
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    );
    console.log(res);
  };
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 border border-black"
      >
        <input
          type="text"
          placeholder="nombre"
          {...register("nombre", {
            required: { value: true, message: "El nombre es requerido" },
            minLength: {
              value: 3,
              message: "Como mínimo, se aceptan 3 letras",
            },
            maxLength: {
              value: 8,
              message: "Como máximo, se aceptan 8 letras",
            },
          })}
        />
        {errors.nombre && (
          <span className="text-sm text-red-500">{errors.nombre?.message}</span>
        )}
        <input
          type="email"
          placeholder="email"
          {...register("email", {
            required: { value: true, message: "El email es requerido" },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "El formato del email no es válido",
            },
          })}
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: { value: true, message: "La contraseña es requerida" },
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            maxLength: { value: 8, message: "Máximo 8 caracteres" },
          })}
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
        <button>Enviar</button>
      </form>
    </section>
  );
}
