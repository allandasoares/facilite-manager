import {
  Box, Card, Heading, Button,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { CreateProductInterface } from '../../../modules/product/interfaces/create-product.interface';
import productService from '../../../modules/product/services/product.service';
import createProductValidator from '../../../modules/product/validators/create-supplier.validator';
import ProductForm from './ProductForm';

const initialValues: CreateProductInterface = {
  name: 'Empresa Teste',
  description: 'Descrição da empresa',
  sku: '123456',
  price: 100,
  image: 'https://www.google.com.br',
  productCategoryId: 1,
  supplierId: 1,
};

export default function RegisterProduct() {
  const navigate = useNavigate();

  const { mutate } = useMutation(productService.create, {
    onSuccess: () => {
      navigate('/products');
    },
  });

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      mutate(formik.values);
    },
    validationSchema: createProductValidator,
  });

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          New product
        </Heading>
        <ProductForm formik={formik} />
        <Button
          colorScheme="blue"
          mt="5"
          type="submit"
          onClick={() => formik.handleSubmit()}
        >
          Create
        </Button>
      </Card>
    </Box>
  );
}
