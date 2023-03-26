import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import productCategoryService from "../../../modules/product-category/services/product-category.service";
import { useEffect, useState } from "react";
import { createProductCategoryValidator } from "../../../modules/product-category/validators/create-product-category.validator";
import { CreateProductCategoryInterface } from "../../../modules/product-category/interfaces/create-product-category.interface";
import ProductCategoryForm from "./ProductCategoryForm";
import { ProductCategoryInterface } from "../../../modules/product-category/interfaces/supplier-product.interface";

const initialValues: CreateProductCategoryInterface = {
  name: "",
  parentId: null,
};

export default function RegisterProductCategory() {
  const handleOnSubmit = async () => {
    try {
      console.log(formik.values);
      await productCategoryService.create(formik.values);
      console.log("Deu certo");
    } catch (error) {
      console.log("Deu Ruim");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleOnSubmit,
    validationSchema: createProductCategoryValidator,
  });
  const [productsCategories, setProductsCategories] = useState<
    ProductCategoryInterface[]
  >([]);

  useEffect(() => {
    productCategoryService
      .getAll()
      .then((response: any) => {
        const res = response.data.data.map((item: any) => {
          return {
            id: item.id,
            label: item.name,
          };
        });
        setProductsCategories(res);
      })
      .catch((error: any) => {
        console.log("Deu erro aqui em", error);
      });
  }, []);

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          New product category
        </Heading>
        <ProductCategoryForm
          formik={formik}
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
