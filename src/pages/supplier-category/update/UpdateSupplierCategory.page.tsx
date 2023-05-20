import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import SupplierCategoryForm from "../SupplierCategoryForm";
import supplierCategoryService from "../../../modules/supplier-category/services/supplier-category.service";
import { SupplierCategoryInterface } from "../../../modules/supplier-category/interfaces/supplier-category.interface";
import createSupplierCategoryValidator from "../../../modules/supplier-category/validators/create-supplier-category.validator";
import { UpdateSupplierCategoryInterface } from "../../../modules/supplier-category/interfaces/update-supplier-category.interface";

const initialValues: UpdateSupplierCategoryInterface = {
  name: "",
  parentId: null,
};

export default function UpdateSupplierCategoryPage() {
  const { supplierCategoryId } = useParams();
  const { mutate } = useMutation(
    (data: UpdateSupplierCategoryInterface) =>
      supplierCategoryService.update(+supplierCategoryId!, data),
    {
      onSuccess: () => {
        alert("Sucesso!");
      },
    }
  );
  const { data } = useQuery(["supplier-category", supplierCategoryId], () =>
    supplierCategoryService.getOne(+supplierCategoryId!)
  );

  const formik = useFormik({
    initialValues: data?.data.data || initialValues,
    onSubmit: () => {
      mutate(formik.values);
    },
    validationSchema: createSupplierCategoryValidator,
    enableReinitialize: true, // This will update initialValues when data?.data.data changes
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
        console.log(error);
      });
  }, []);

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Atualizar categoria de fornecedor
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
          Update
        </Button>
      </Card>
    </Box>
  );
}
