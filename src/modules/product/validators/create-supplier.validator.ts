import * as Yup from "yup";

const createProductValidator = Yup.object({
  name: Yup.string().required("Preencha esse campo").max(191),
  description: Yup.string().required("Preencha esse campo"),
  subtitle: Yup.string().required("Preencha esse campo").max(191),
  image: Yup.string().max(191),
  price: Yup.number().required("Preencha esse campo"),
  supplierId: Yup.number().required("Preencha esse campo"),
  productCategoryId: Yup.number().required("Preencha esse campo"),
  active: Yup.boolean(),
});

export default createProductValidator;
