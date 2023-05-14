import * as Yup from "yup";

const createKeywordValidator = Yup.object({
  name: Yup.string().required("Preencha esse campo.").max(191),
});

export default createKeywordValidator;
