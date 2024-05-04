import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AxiosRequest } from "../../core/request/axios";
import { useRequest } from "../../core/request/useRequest";
import { ILogin } from "./interface/ILogin";
import { loginSchema } from "./validator/validator";
import { Button } from "@/components/ui/button";

export function Login() {
  const { post } = useRequest(new AxiosRequest(), "http://localhost:3000");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  });

  async function login(login: ILogin) {
    const { data, hasErro } = await post("/usuario/login", login);

    if (hasErro) {
      return;
    }

    localStorage.setItem("token", data.access_token);
    navigate("/teste");
  }

  return (
    <div className="flex justify-center mb-5 mt-5">
      <form onSubmit={handleSubmit(login)}>
        <input id="email" {...register("email")} />
        <input id="senha" type="password" {...register("senha")} />
        <div className="flex justify-center mt-2">
          <Button type="submit">Entrar</Button>
        </div>
      </form>
    </div>
  );
}
