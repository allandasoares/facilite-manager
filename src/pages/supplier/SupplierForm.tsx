import { SimpleGrid } from '@chakra-ui/react';
import TextField from '../../components/form/TextField';

const SupplierForm = ({ formik }: any) => (
    <form onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={2} spacing={10}>
        <TextField id="companyName" label="Nome da Empresa" formik={formik} />
        <TextField id="tradingName" label="Nome Fantasia" formik={formik} />
        <TextField id="cnpj" label="CNPJ" formik={formik} />
        <TextField id="email" label="E-mail" type="email" formik={formik} />
        <TextField id="phoneNumber" label="Telefone" formik={formik} />
        <TextField id="mobileNumber" label="Celular" formik={formik} />
        <TextField id="street" label="Rua" formik={formik} />
        <TextField id="number" label="Número" formik={formik} />
        <TextField id="neighborhood" label="Bairro" formik={formik} />
        <TextField id="city" label="Cidade" formik={formik} />
        <TextField id="state" label="Estado" formik={formik} />
        <TextField id="zipCode" label="CEP" formik={formik} />
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
