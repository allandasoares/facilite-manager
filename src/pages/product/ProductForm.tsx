import { FormLabel, SimpleGrid } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import SearchableSelect from "../../components/form/SearchableSelect";
import TextField from "../../components/form/TextField";
import RichText from "../../components/form/RichText";

const ProductForm = ({
  formik,
  productCategories,
  suppliers,
  productFeatures,
}: any) => (
  <form onSubmit={formik.handleSubmit}>
    <SimpleGrid columns={2} spacing={10}>
      <TextField id="name" label="Nome do produto" formik={formik} />
      <TextField id="subtitle" label="Subtitulo" formik={formik} />
      <TextField id="brand" label="Marca" type="text" formik={formik} />
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
      <div>
        <FormLabel>Caracteristicas</FormLabel>
        <Select
          isMulti
          colorScheme="blue"
          options={productFeatures}
          name="label"
          value={formik.values.productFeatures}
          onChange={(values) => {
            formik.setFieldValue("productFeatures", values);
          }}
        />
      </div>
    </SimpleGrid>
    <SimpleGrid columns={1} spacing={10} style={{ marginTop: 16 }}>
      <RichText formik={formik} id="description" />
    </SimpleGrid>
  </form>
);

export default ProductForm;
