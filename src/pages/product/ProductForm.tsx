import { SimpleGrid } from '@chakra-ui/react';
import TextField from '../../components/form/TextField';

const ProductForm = ({ formik }: any) => (
    <form onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={2} spacing={10}>
        <TextField id="name" label="Nome do produto" formik={formik} />
        <TextField id="description" label="Descrição" formik={formik} />
        <TextField id="sku" label="SKU" formik={formik} />
        <TextField id="price" label="Preço" type="number" formik={formik} />
        <TextField id="image" label="Imagem" formik={formik} />
        <TextField id="productCategoryId" label="Categoria" type="number" formik={formik} />
        <TextField id="supplierId" label="Fornecedor" type="number" formik={formik} />
      </SimpleGrid>
    </form>
);

export default ProductForm;
