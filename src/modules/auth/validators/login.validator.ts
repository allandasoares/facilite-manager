import * as Yup from "yup";

export const loginValidator = Yup.object({
  email: Yup.string().email("Email Inválido.").required("Preencha esse campo."),
  password: Yup.string().required("Preencha esse campo."),
});
