import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ProductCategoryInterface } from "../../../modules/product-category/interfaces/supplier-product.interface";
import productCategoryCategoryService from "../../../modules/product-category/services/product-category.service";
import { UpdateProductInterface } from "../../../modules/product/interfaces/update-product.interface";
import productService from "../../../modules/product/services/product.service";
import createProductValidator from "../../../modules/product/validators/create-supplier.validator";
import { SupplierInterface } from "../../../modules/supplier/interfaces/supplier.interface";
import supplierService from "../../../modules/supplier/services/supplier.service";
import ProductForm from "../ProductForm";

const emptyProduct: UpdateProductInterface = {
  name: "",
  description: "",
  sku: "",
  price: 0,
  image: "",
  productCategoryId: 0,
  supplierId: 0,
};

export default function UpdateProductPage() {
  const { productId } = useParams();
  const { mutate } = useMutation(
    (data: UpdateProductInterface) => productService.update(+productId!, data),
    {
      onSuccess: () => {},
    }
  );
  const { data } = useQuery(["product", productId], () =>
    productService.getOne(+productId!)
  );

  const {
    data: productCategoriesForSelect,
    isLoading: productCategoriesLoading,
  } = useQuery(
    "product-categories",
    () => productCategoryCategoryService.getAll(),
    {
      select: (res) =>
        res.data.data.map((item: ProductCategoryInterface) => ({
          label: item.name,
          id: item.id,
        })),
    }
  );
  const { data: suppliersForSelect, isLoading: supplierLoading } = useQuery(
    "suppliers",
    () => supplierService.getAll(),
    {
      select: (res) =>
        res.data.data.map((item: SupplierInterface) => ({
          label: item.companyName,
          id: item.id,
        })),
    }
  );

  const formik = useFormik({
    initialValues: data?.data.data || emptyProduct,
    onSubmit: () => {
      mutate(formik.values);
    },
    validationSchema: createProductValidator,
    enableReinitialize: true, // This will update initialValues when data?.data.data changes
  });

  if (productCategoriesLoading || supplierLoading) return <Box>Loading...</Box>;

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Atualizar produto
        </Heading>
        <>
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
            Update
          </Button>
        </>
      </Card>
    </Box>
  );
}
