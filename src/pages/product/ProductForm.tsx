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
  productkeywords,
}: any) => (
  <form onSubmit={formik.handleSubmit}>
    {console.log(productkeywords)}
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
          getOptionValue={(option) => option.id}
          value={formik.values.productFeatures}
          closeMenuOnSelect={false}
          onChange={(values) => {
            formik.setFieldValue("productFeatures", values);
          }}
        />
      </div>
      <div style={{ marginBottom: 160 }}>
        <FormLabel>Palavras Chaves</FormLabel>
        <Select
          isMulti
          colorScheme="blue"
          options={productkeywords}
          getOptionValue={(option) => option.id}
          value={formik.values.productKeywords}
          closeMenuOnSelect={false}
          onChange={(values) => {
            formik.setFieldValue("productKeywords", values);
          }}
        />
      </div>
      <TextField
        id="minimumToEstimate"
        label="Minimo para orçamento"
        type="number"
        step={1}
        formik={formik}
      />
    </SimpleGrid>
    <SimpleGrid columns={1} spacing={10}>
      <RichText formik={formik} id="description" />
    </SimpleGrid>
  </form>
);

export default ProductForm;
