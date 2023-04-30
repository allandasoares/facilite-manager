import { SimpleGrid } from "@chakra-ui/react";
import TextField from "../../components/form/TextField";
import {
  CEP_MASK,
  CNPJ_MASK,
  MOBILE_NUMBER_MASK,
  PHONE_NUMBER_MASK,
} from "../../shared/constants/mask.constant";

const SupplierForm = ({ formik }: any) => (
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
      <TextField id="logo" label="Logo" isRequired={false} formik={formik} />
    </SimpleGrid>
  </form>
);

export default SupplierForm;
