import { Box, Card, SimpleGrid, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { CreateSupplierInterface } from "../../../modules/supplier/interfaces/create-supplier.interface";
import supplierService from "../../../modules/supplier/services/supplier.service";
import { createSupplierValidator } from "../../../modules/supplier/validators/create-supplier.validator";
import { useEffect } from "react";
import SupplierForm from "./SupplierForm";

const initialValues: CreateSupplierInterface = {
  companyName: "Empresa Teste",
  tradingName: "Empresinha",
  cnpj: "1234567892",
  email: "a2@a.com",
  phoneNumber: "1934353705",
  mobileNumber: "19983136930",
  street: "Rua dos amores",
  number: "127",
  neighborhood: "São Jorge",
  city: "Piracicaba",
  state: "São Paulo",
  zipCode: "13402803",
  segment: "Metalorgico",
  website: "https://google.com",
  description: "descricao",
  logo: "logo",
};

export default function RegisterSupplier() {
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    try {
      await supplierService.create(formik.values);
      console.log("Deu certo");
    } catch (error) {
      console.log("Deu Ruim");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleOnSubmit,
    validationSchema: createSupplierValidator,
  });

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          New supplier
        </Heading>
        <SupplierForm formik={formik} />
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
