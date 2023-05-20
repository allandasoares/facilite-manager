import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import useFileInput from "../../../hooks/useFileInput";
import useFormDataTransformer from "../../../hooks/useFormDataTransformer";
import { FeatureInterface } from "../../../modules/feature/interfaces/feature.interface";
import featureService from "../../../modules/feature/services/feature.service";
import keywordService from "../../../modules/keyword/services/keyword.service";
import { ProductCategoryInterface } from "../../../modules/product-category/interfaces/supplier-product.interface";
import productCategoryCategoryService from "../../../modules/product-category/services/product-category.service";
import { CreateProductInterface } from "../../../modules/product/interfaces/create-product.interface";
import productService from "../../../modules/product/services/product.service";
import createProductValidator from "../../../modules/product/validators/create-supplier.validator";
import { SupplierInterface } from "../../../modules/supplier/interfaces/supplier.interface";
import supplierService from "../../../modules/supplier/services/supplier.service";
import ProductForm from "../ProductForm";

const initialValues: CreateProductInterface = {
  name: "",
  description: "",
  subtitle: "",
  brand: "",
  price: 0,
  minimumToEstimate: 1,
  image: "",
  productCategoryId: null,
  supplierId: null,
  productFeatures: [],
  productKeywords: [],
};

export default function CreatProductPage() {
  const navigate = useNavigate();
  const imageInput = useFileInput();
  const { transform } = useFormDataTransformer();

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

  const { data: featuresForSelect, isLoading: featureLoading } = useQuery(
    "features",
    () => featureService.getAll(),
    {
      select: (data) =>
        data.data.data.map((item: FeatureInterface) => ({
          label: item.name,
          id: item.id,
        })),
    }
  );

  const { data: keywordsForSelect, isLoading: keywordsLoading } = useQuery(
    "keywords",
    () => keywordService.getAll(),
    {
      select: (data) =>
        data.data.data.map((item: FeatureInterface) => ({
          label: item.name,
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
      const featureIds = formik.values?.productFeatures?.map((item) => item.id);
      const keywordIds = formik.values?.productKeywords?.map((item) => item.id);
      const formData: any = transform({
        values: formik.values,
        exceptKeys: ["image", "productFeatures", "productKeywords"],
        appendData: {
          image: imageInput.value,
          productFeatures: featureIds,
          productKeywords: keywordIds,
        },
      });

      mutate(formData);
    },
    validationSchema: createProductValidator,
  });

  if (
    productCategoriesLoading ||
    supplierLoading ||
    featureLoading ||
    keywordsLoading
  )
    return <Box>Loading...</Box>;

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Criar Produto
        </Heading>
        <ProductForm
          formik={formik}
          imageInput={imageInput}
          productCategories={productCategoriesForSelect}
          suppliers={suppliersForSelect}
          productFeatures={featuresForSelect}
          productkeywords={keywordsForSelect}
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
