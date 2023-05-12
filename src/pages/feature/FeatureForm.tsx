import { SimpleGrid } from "@chakra-ui/react";
import TextField from "../../components/form/TextField";

const FeatureForm = ({ formik }: any) => (
  <form onSubmit={formik.handleSubmit}>
    <SimpleGrid columns={2} spacing={10}>
      <TextField id="name" label="Nome" formik={formik} />
      <TextField id="icon" label="Icone" formik={formik} />
    </SimpleGrid>
  </form>
);

export default FeatureForm;
