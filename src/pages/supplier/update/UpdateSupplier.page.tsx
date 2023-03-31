import React from "react";
import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { UpdateSupplierInterface } from "../../../modules/supplier/interfaces/update-supplier.interface";
import supplierService from "../../../modules/supplier/services/supplier.service";
import createSupplierValidator from "../../../modules/supplier/validators/create-supplier.validator";
import SupplierForm from "../SupplierForm";

const emptySupplier: UpdateSupplierInterface = {
  companyName: "",
  tradingName: "",
  cnpj: "",
  email: "",
  phoneNumber: "",
  mobileNumber: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  zipCode: "",
  segment: "",
  website: "",
  description: "",
  logo: "",
};

export default function UpdateSupplierPage() {
  const { supplierId } = useParams();
  const { mutate } = useMutation(
    (data: UpdateSupplierInterface) =>
      supplierService.update(+supplierId!, data),
    {
      onSuccess: () => {},
    }
  );
  const { data } = useQuery(["supplier", supplierId], () =>
    supplierService.getOne(+supplierId!)
  );

  const formik = useFormik({
    initialValues: data?.data.data || emptySupplier,
    onSubmit: () => {
      mutate(formik.values);
    },
    validationSchema: createSupplierValidator,
    enableReinitialize: true, // This will update initialValues when data?.data.data changes
  });

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Atualizar Fornecedor
        </Heading>
        <>
          <SupplierForm formik={formik} />
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
