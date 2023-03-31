import { SimpleGrid } from '@chakra-ui/react';
import SearchableSelect from '../../components/form/SearchableSelect';
import TextField from '../../components/form/TextField';

const SupplierCategoryForm = ({ formik, suppliersCategories }: any) => (
    <form onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={2} spacing={10}>
        <TextField id="name" label="Nome" formik={formik} />
        <SearchableSelect
          id="parentId"
          label="Categoria Pai"
          items={suppliersCategories}
          formik={formik}
        />
      </SimpleGrid>
    </form>
);

export default SupplierCategoryForm;
