import * as Yup from "yup";

const createFeatureValidator = Yup.object({
  name: Yup.string().required("Preencha esse campo.").max(191),
  icon: Yup.string().required("Preencha esse campo.").max(191),
});

export default createFeatureValidator;
