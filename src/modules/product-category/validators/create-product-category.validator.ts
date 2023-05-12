import * as Yup from "yup";

const createProductCategoryValidator = Yup.object({
  name: Yup.string().required("Preencha esse campo.").max(255),
  parentId: Yup.number().nullable().optional(),
  Image: Yup.string().nullable().optional(),
});

export default createProductCategoryValidator;
