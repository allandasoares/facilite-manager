import { Box, FormLabel, SimpleGrid } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import SearchableSelect from "../../components/form/SearchableSelect";
import TextField from "../../components/form/TextField";
import RichText from "../../components/form/RichText";

const ProductForm = ({
  formik,
  imageInput,
  productCategories,
  suppliers,
  productFeatures,
  productkeywords,
}: any) => {
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    if (!imageInput.value) {
      setPreviewImage(formik.values.image ?? "");
      return;
    }
    const reader = new FileReader();
    const file = imageInput.value;

    reader.onloadend = () => {
      setPreviewImage(reader.result as any);
    };

    reader.readAsDataURL(file);
  }, [imageInput, formik.values.image]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={2} spacing={10}>
        <TextField id="name" label="Nome do produto" formik={formik} />
        <TextField id="subtitle" label="Subtitulo" formik={formik} />
        <TextField id="brand" label="Marca" type="text" formik={formik} />
        <TextField id="price" label="Preço" type="number" formik={formik} />
        <TextField
          id="minimumToEstimate"
          label="Minimo para orçamento"
          type="number"
          step={1}
          formik={formik}
        />
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
        <div>
          <TextField
            id="image"
            label="Imagem"
            type="file"
            isRequired={false}
            formik={formik}
            multiple={false}
            value={""}
            onChange={(e) => {
              formik.handleChange(e);
              imageInput.handleChange(e);
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
      <SimpleGrid columns={1} spacing={10}>
        <RichText formik={formik} id="description" />
      </SimpleGrid>
    </form>
  );
};

export default ProductForm;
