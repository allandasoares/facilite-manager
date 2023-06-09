import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import productCategoryService from "../../../modules/product-category/services/product-category.service";
import createProductCategoryValidator from "../../../modules/product-category/validators/create-product-category.validator";
import ProductCategoryForm from "../ProductCategoryForm";
import { ProductCategoryInterface } from "../../../modules/product-category/interfaces/supplier-product.interface";
import { UpdateProductCategoryInterface } from "../../../modules/product-category/interfaces/update-product-category.interface";
import useFileInput from "../../../hooks/useFileInput";
import useFormDataTransformer from "../../../hooks/useFormDataTransformer";

const initialValues: UpdateProductCategoryInterface = {
  name: "",
  parentId: null,
  image: "",
};

export default function UpdateProductCategoryPage() {
  const { productCategoryId } = useParams();
  const imageInput = useFileInput();
  const { transform } = useFormDataTransformer();
  const { mutate } = useMutation(
    (data: UpdateProductCategoryInterface) =>
      productCategoryService.update(+productCategoryId!, data),
    {
      onSuccess: () => {
        alert("Sucesso!");
      },
    }
  );
  const { data: productCategoryReq } = useQuery(
    ["product-category", productCategoryId],
    () => productCategoryService.getOne(+productCategoryId!)
  );

  const formik = useFormik({
    initialValues: productCategoryReq?.data.data || initialValues,
    onSubmit: () => {
      const formData: any = transform({
        values: formik.values,
        exceptKeys: ["image", "id", "parentId"],
        appendData: {
          image: imageInput.value ?? formik.values.image,
          parentId: formik.values.parentId || null,
        },
      });

      mutate(formData);
    },
    validationSchema: createProductCategoryValidator,
    enableReinitialize: true, // This will update initialValues when data?.data.data changes
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
          Atualizar categoria de produto
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
          Update
        </Button>
      </Card>
    </Box>
  );
}
