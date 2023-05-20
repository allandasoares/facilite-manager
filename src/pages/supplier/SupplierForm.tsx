import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TextField from "../../components/form/TextField";
import {
  CEP_MASK,
  CNPJ_MASK,
  MOBILE_NUMBER_MASK,
  PHONE_NUMBER_MASK,
} from "../../shared/constants/mask.constant";

const SupplierForm = ({ formik, fileInput }: any) => {
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    if (!fileInput.value) {
      setPreviewImage(formik.values.logo ?? "");
      return;
    }
    const reader = new FileReader();
    const file = fileInput.value;

    reader.onloadend = () => {
      setPreviewImage(reader.result as any);
    };

    reader.readAsDataURL(file);
  }, [fileInput, formik.values.logo]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={2} spacing={10}>
        <TextField id="companyName" label="Nome da Empresa" formik={formik} />
        <TextField id="tradingName" label="Nome Fantasia" formik={formik} />
        <TextField id="cnpj" mask={CNPJ_MASK} label="CNPJ" formik={formik} />
        <TextField id="email" label="E-mail" type="email" formik={formik} />
        <TextField
          id="phoneNumber"
          label="Telefone"
          mask={PHONE_NUMBER_MASK}
          formik={formik}
        />
        <TextField
          id="mobileNumber"
          label="Celular"
          mask={MOBILE_NUMBER_MASK}
          formik={formik}
        />
        <TextField id="street" label="Rua" formik={formik} />
        <TextField id="number" label="Número" formik={formik} />
        <TextField id="neighborhood" label="Bairro" formik={formik} />
        <TextField id="city" label="Cidade" formik={formik} />
        <TextField id="state" label="Estado" formik={formik} />
        <TextField id="zipCode" mask={CEP_MASK} label="CEP" formik={formik} />
        <TextField
          id="website"
          label="Website"
          isRequired={false}
          formik={formik}
        />
        <TextField id="description" label="Descrição" formik={formik} />
        <div>
          <TextField
            id="logo"
            label="Logo"
            type="file"
            isRequired={false}
            formik={formik}
            multiple={false}
            value={""}
            onChange={(e) => {
              formik.handleChange(e);
              fileInput.handleChange(e);
            }}
          />
          {previewImage && (
            <Box mt={4}>
              <Box
                border="1px"
                borderColor="gray.200"
                boxShadow="sm"
                p={2}
                rounded="md"
                bg="white"
              >
                <img
                  src={previewImage}
                  alt="Image Preview"
                  style={{ width: 256, height: 256, objectFit: "cover" }}
                />
              </Box>
            </Box>
          )}
        </div>
      </SimpleGrid>
    </form>
  );
};

export default SupplierForm;
