import { Box, Card, SimpleGrid, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { createSupplierValidator } from "../../../modules/supplier/validators/create-supplier.validator";
import SupplierCategoryForm from "./SupplierCategoryForm";
import { CreateSupplierCategoryInterface } from "../../../modules/supplier-category/interfaces/create-supplier-category.interface";
import supplierCategoryService from "../../../modules/supplier-category/services/supplier-category.service";
import { useEffect, useState } from "react";
import { SupplierCategoryInterface } from "../../../modules/supplier-category/interfaces/supplier-category.interface";

const initialValues: CreateSupplierCategoryInterface = {
  name: "Empresa Teste",
  parentId: 1,
};

export default function RegisterSupplierCategory() {
  const handleOnSubmit = async () => {
    try {
      console.log(formik.values);
      await supplierCategoryService.create(formik.values);
      console.log("Deu certo");
    } catch (error) {
      console.log("Deu Ruim");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleOnSubmit,
    // validationSchema: createSupplierValidator,
  });
  const [suppliersCategories, setSuppliersCategories] = useState<
    SupplierCategoryInterface[]
  >([]);

  useEffect(() => {
    supplierCategoryService
      .getAll()
      .then((response: any) => {
        const res = response.data.data.map((item: any) => {
          return {
            id: item.id,
            label: item.name,
          };
        });
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
          New supplier category
        </Heading>
        <SupplierCategoryForm formik={formik} suppliersCategories={suppliersCategories} />
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
