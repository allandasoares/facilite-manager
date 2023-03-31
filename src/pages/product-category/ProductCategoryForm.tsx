import { SimpleGrid } from '@chakra-ui/react';
import SearchableSelect from '../../components/form/SearchableSelect';
import TextField from '../../components/form/TextField';

const ProductCategoryForm = ({ formik, productsCategories }: any) => (
    <form onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={2} spacing={10}>
        <TextField id="name" label="Nome" formik={formik} />
        <SearchableSelect
          id="parentId"
          label="Categoria Pai"
          items={productsCategories}
          formik={formik}
        />
      </SimpleGrid>
    </form>
);

export default ProductCategoryForm;
