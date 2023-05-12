import * as Yup from "yup";

const createFeatureValidator = Yup.object({
  name: Yup.string().required("Preencha esse campo.").max(255),
  icon: Yup.string().required("Preencha esse campo.").max(255),
});

export default createFeatureValidator;
