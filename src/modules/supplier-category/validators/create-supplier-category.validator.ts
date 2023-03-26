import * as Yup from "yup";

export const createSupplierCategoryValidator = Yup.object({
  name: Yup.string().required("Preencha esse campo.").max(255),
  parentId: Yup.number(),
});
