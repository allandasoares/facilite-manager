import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ProductCategoryInterface } from "../../../modules/product-category/interfaces/supplier-product.interface";
import productCategoryCategoryService from "../../../modules/product-category/services/product-category.service";
import { CreateProductInterface } from "../../../modules/product/interfaces/create-product.interface";
import productService from "../../../modules/product/services/product.service";
import createProductValidator from "../../../modules/product/validators/create-supplier.validator";
import { SupplierInterface } from "../../../modules/supplier/interfaces/supplier.interface";
import supplierService from "../../../modules/supplier/services/supplier.service";
import ProductForm from "../ProductForm";

const initialValues: CreateProductInterface = {
  name: "Empresa Teste",
  description: "Descrição da empresa",
  sku: "123456",
  price: 100,
  image: "https://www.google.com.br",
  productCategoryId: 1,
  supplierId: 1,
};

export default function CreatProductPage() {
  const navigate = useNavigate();

  const {
    data: productCategoriesForSelect,
    isLoading: productCategoriesLoading,
  } = useQuery(
    "product-categories",
    () => productCategoryCategoryService.getAll(),
    {
      select: (data) =>
        data.data.data.map((item: ProductCategoryInterface) => ({
          label: item.name,
          id: item.id,
        })),
    }
  );
  const { data: suppliersForSelect, isLoading: supplierLoading } = useQuery(
    "suppliers",
    () => supplierService.getAll(),
    {
      select: (data) =>
        data.data.data.map((item: SupplierInterface) => ({
          label: item.companyName,
          id: item.id,
        })),
    }
  );

  const { mutate } = useMutation(productService.create, {
    onSuccess: () => {
      navigate("/products");
    },
  });

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      mutate(formik.values);
    },
    validationSchema: createProductValidator,
  });

  if (productCategoriesLoading || supplierLoading) return <Box>Loading...</Box>;

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Criar Produto
        </Heading>
        <ProductForm
          formik={formik}
          productCategories={productCategoriesForSelect}
          suppliers={suppliersForSelect}
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
