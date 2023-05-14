import { SimpleGrid } from "@chakra-ui/react";
import TextField from "../../components/form/TextField";

const ProductCategoryForm = ({ formik }: any) => (
  <form onSubmit={formik.handleSubmit}>
    <SimpleGrid columns={1} spacing={10}>
      <TextField id="name" label="Nome" formik={formik} />
    </SimpleGrid>
  </form>
);

export default ProductCategoryForm;
