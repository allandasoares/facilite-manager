import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import productCategoryService from "../../../modules/product-category/services/product-category.service";
import createProductCategoryValidator from "../../../modules/product-category/validators/create-product-category.validator";
import { CreateProductCategoryInterface } from "../../../modules/product-category/interfaces/create-product-category.interface";
import ProductCategoryForm from "../ProductCategoryForm";
import { ProductCategoryInterface } from "../../../modules/product-category/interfaces/supplier-product.interface";
import useFileInput from "../../../hooks/useFileInput";
import useFormDataTransformer from "../../../hooks/useFormDataTransformer";

const initialValues: CreateProductCategoryInterface = {
  name: "",
  parentId: null,
  image: "",
};

export default function CreateProductCategoryPage() {
  const imageInput = useFileInput();
  const { transform } = useFormDataTransformer();
  const { mutate } = useMutation(productCategoryService.create, {
    onSuccess: () => {
      alert("Sucesso!");
    },
  });
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      const formData: any = transform({
        values: formik.values,
        exceptKeys: ["image"],
        appendData: { image: imageInput.value },
      });
      mutate(formData);
    },
    validationSchema: createProductCategoryValidator,
  });
  const [productsCategories, setProductsCategories] = useState<
    ProductCategoryInterface[]
  >([]);

  const { data: productCategoriesForSelect } = useQuery(
    "products-category",
    productCategoryService.getAll,
    {
      select: (data) =>
        data.data.data.map((productCategory: ProductCategoryInterface) => ({
          id: productCategory.id,
          label: productCategory.name,
        })),
    }
  );
  useEffect(() => {
    if (!productCategoriesForSelect) return;

    setProductsCategories(productCategoriesForSelect);
  }, [productCategoriesForSelect]);

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Nova categoria de produto
        </Heading>
        <ProductCategoryForm
          formik={formik}
          imageInput={imageInput}
          productsCategories={productsCategories}
        />
        <Button
          colorScheme="blue"
          mt="5"
          type="submit"
          onClick={() => formik.handleSubmit()}
        >
          Create
        </Button>
      </Card>
    </Box>
  );
}
