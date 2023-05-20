import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import useFileInput from "../../../hooks/useFileInput";
import useFormDataTransformer from "../../../hooks/useFormDataTransformer";
import { CreateSupplierInterface } from "../../../modules/supplier/interfaces/create-supplier.interface";
import supplierService from "../../../modules/supplier/services/supplier.service";
import createSupplierValidator from "../../../modules/supplier/validators/create-supplier.validator";
import SupplierForm from "../SupplierForm";

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
  logo: "",
};

export default function CreateSupplierPage(): JSX.Element {
  const { mutate } = useMutation(supplierService.create, {
    onSuccess: () => {
      alert("Sucesso!");
    },
  });
  const logoInput = useFileInput();
  const { transform } = useFormDataTransformer();

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      const formData: any = transform({
        values: formik.values,
        exceptKeys: ["logo"],
        appendData: { logo: logoInput.value },
      });

      mutate(formData);
    },
    validationSchema: createSupplierValidator,
  });

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Novo Fornecedor
        </Heading>
        <SupplierForm formik={formik} fileInput={logoInput} />
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
