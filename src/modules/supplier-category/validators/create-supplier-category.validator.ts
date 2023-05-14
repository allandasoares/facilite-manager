import * as Yup from "yup";

const createSupplierCategoryValidator = Yup.object({
  name: Yup.string().required("Preencha esse campo.").max(191),
  parentId: Yup.number().optional().nullable(),
});

export default createSupplierCategoryValidator;
