import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import SupplierCategoryForm from "../SupplierCategoryForm";
import { CreateSupplierCategoryInterface } from "../../../modules/supplier-category/interfaces/create-supplier-category.interface";
import supplierCategoryService from "../../../modules/supplier-category/services/supplier-category.service";
import { SupplierCategoryInterface } from "../../../modules/supplier-category/interfaces/supplier-category.interface";
import createSupplierCategoryValidator from "../../../modules/supplier-category/validators/create-supplier-category.validator";

const initialValues: CreateSupplierCategoryInterface = {
  name: "",
  parentId: null,
};

export default function CreateSupplierCategoryPage() {
  const { mutate } = useMutation(supplierCategoryService.create, {
    onSuccess: () => {
      alert("Sucesso!");
    },
  });

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      mutate(formik.values);
    },
    validationSchema: createSupplierCategoryValidator,
  });
  const [suppliersCategories, setSuppliersCategories] = useState<
    SupplierCategoryInterface[]
  >([]);

  useEffect(() => {
    supplierCategoryService
      .getAll()
      .then((response: any) => {
        const res = response.data.data.map((item: any) => ({
          id: item.id,
          label: item.name,
        }));
        setSuppliersCategories(res);
      })
      .catch((error: any) => {
        console.log("Deu erro aqui em", error);
      });
  }, []);

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Nova categoria de fornecedor
        </Heading>
        <SupplierCategoryForm
          formik={formik}
          suppliersCategories={suppliersCategories}
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
