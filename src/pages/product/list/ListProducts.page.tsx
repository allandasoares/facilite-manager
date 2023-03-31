import {
  Box, Button, Card, WrapItem,
} from '@chakra-ui/react';
import { MdAddCircle } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import productService from '../../../modules/product/services/product.service';
import ProductsTable from './ProductsTable';

export default function ListProducts() {
  const navigate = useNavigate();

  const { data } = useQuery('products', productService.getAll);

  return (
    <Box w="100%" h="100vh">
      <WrapItem>
        <Button
          leftIcon={<MdAddCircle />}
          colorScheme="green"
          mb={4}
          onClick={() => navigate('/products/new')}
        >
          Novo
        </Button>
      </WrapItem>
      <Card justify="center" p="30px">
        <ProductsTable products={data?.data?.data} />
      </Card>
    </Box>
  );
}
