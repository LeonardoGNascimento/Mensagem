import { object, string } from "yup";

export const loginSchema = object({
  email: string().email("E-mail inválido").required("E-mail inválido"),
  senha: string().required("Senha inválida"),
});
