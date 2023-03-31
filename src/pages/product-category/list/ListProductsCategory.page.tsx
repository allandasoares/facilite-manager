import {
  Box, Button, Card, WrapItem,
} from '@chakra-ui/react';
import { MdAddCircle } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import productCategoryService from '../../../modules/product-category/services/product-category.service';
import ProductsCategoryTable from './ProductsCategoryTable';

export default function ListProductsCategoryPage() {
  const navigate = useNavigate();

  const { data } = useQuery('products-category', productCategoryService.getAll);

  return (
    <Box w="100%" h="100vh">
      <WrapItem>
        <Button
          leftIcon={<MdAddCircle />}
          colorScheme="green"
          mb={4}
          onClick={() => navigate('/products-categories/new')}
        >
          Novo
        </Button>
      </WrapItem>
      <Card justify="center" p="30px">
        <ProductsCategoryTable productsCategories={data?.data?.data} />
      </Card>
    </Box>
  );
}
