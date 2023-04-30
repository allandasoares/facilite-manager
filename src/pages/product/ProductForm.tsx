import { SimpleGrid } from "@chakra-ui/react";
import SearchableSelect from "../../components/form/SearchableSelect";
import TextField from "../../components/form/TextField";

const ProductForm = ({ formik, productCategories, suppliers }: any) => (
  <form onSubmit={formik.handleSubmit}>
    <SimpleGrid columns={2} spacing={10}>
      <TextField id="name" label="Nome do produto" formik={formik} />
      <TextField id="description" label="Descrição" formik={formik} />
      <TextField id="sku" label="SKU" formik={formik} />
      <TextField id="price" label="Preço" type="number" formik={formik} />
      <TextField id="image" label="Imagem" formik={formik} />
      <SearchableSelect
        id="productCategoryId"
        label="Categoria"
        items={productCategories}
        formik={formik}
      />
      <SearchableSelect
        id="supplierId"
        label="Fornecedor"
        items={suppliers}
        formik={formik}
      />
    </SimpleGrid>
  </form>
);

export default ProductForm;
