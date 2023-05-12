import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { FeatureInterface } from "../../../modules/feature/interfaces/feature.interface";
import featureService from "../../../modules/feature/services/feature.service";
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
  subtitle: "",
  brand: "",
  price: 0,
  image: "",
  productCategoryId: 0,
  supplierId: 0,
  productFeatures: [],
};

export default function UpdateProductPage() {
  const { productId } = useParams();
  const { mutate } = useMutation(
    (data: UpdateProductInterface) => productService.update(+productId!, data),
    {
      onSuccess: () => {
        alert("Sucesso!");
      },
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

  const { data: featuresForSelect, isLoading: featureLoading } = useQuery(
    "features",
    () => featureService.getAll(),
    {
      select: (res) =>
        res.data.data.map((item: FeatureInterface) => ({
          label: item.name,
          id: item.id,
        })),
    }
  );

  const features = data?.data.data?.productFeatures.map((feature: any) => ({
    id: feature.features.id,
    label: feature.features.name,
  }));

  const formik = useFormik({
    initialValues:
      { ...data?.data.data, productFeatures: features } || emptyProduct,
    onSubmit: () => {
      const featureIds = formik.values?.productFeatures.map(
        (item: any) => item.id
      );
      mutate({
        ...formik.values,
        productFeatures: featureIds,
      });
    },
    validationSchema: createProductValidator,
    enableReinitialize: true, // This will update initialValues when data?.data.data changes
  });

  if (productCategoriesLoading || supplierLoading || featureLoading)
    return <Box>Loading...</Box>;

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
            productFeatures={featuresForSelect}
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
