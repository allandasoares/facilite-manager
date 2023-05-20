import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SearchableSelect from "../../components/form/SearchableSelect";
import TextField from "../../components/form/TextField";

const ProductCategoryForm = ({
  formik,
  imageInput,
  productsCategories,
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
        <TextField id="name" label="Nome" formik={formik} />
        <SearchableSelect
          id="parentId"
          label="Categoria Pai"
          items={productsCategories}
          formik={formik}
        />
      </SimpleGrid>
      <SimpleGrid columns={1} spacing={10}>
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
    </form>
  );
};

export default ProductCategoryForm;
