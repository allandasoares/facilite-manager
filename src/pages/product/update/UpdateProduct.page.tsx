import {
  Box, Card, Heading, Button,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { UpdateProductInterface } from '../../../modules/product/interfaces/update-product.interface';
import productService from '../../../modules/product/services/product.service';
import createProductValidator from '../../../modules/product/validators/create-supplier.validator';
import ProductForm from '../ProductForm';

const emptyProduct: UpdateProductInterface = {
  name: '',
  description: '',
  sku: '',
  price: 0,
  image: '',
  productCategoryId: 0,
  supplierId: 0,
};

export default function UpdateProductPage() {
  const { productId } = useParams();
  const { mutate } = useMutation(
    (data: UpdateProductInterface) => productService.update(+productId!, data),
    {
      onSuccess: () => {},
    },
  );
  const { data } = useQuery(['product', productId], () => productService.getOne(+productId!));

  const formik = useFormik({
    initialValues: data?.data.data || emptyProduct,
    onSubmit: () => { mutate(formik.values); },
    validationSchema: createProductValidator,
    enableReinitialize: true, // This will update initialValues when data?.data.data changes
  });

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Novo produto
        </Heading>
          <>
            <ProductForm formik={formik} />
            <Button
              colorScheme="blue"
              mt="5"
              type="submit"
              onClick={() => formik.handleSubmit()}
            >
              Update
            </Button>
          </>
      </Card>
    </Box>
  );
}
