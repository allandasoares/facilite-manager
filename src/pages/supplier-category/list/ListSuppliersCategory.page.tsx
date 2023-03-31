import {
  Box, Button, Card, WrapItem,
} from '@chakra-ui/react';
import { MdAddCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import supplierCategoryService from '../../../modules/supplier-category/services/supplier-category.service';
import SuppliersCategoryTable from './SuppliersCategoryTable';

export default function ListSuppliersCategory() {
  const navigate = useNavigate();

  const { data } = useQuery('suppliers-category', supplierCategoryService.getAll);

  return (
    <Box w="100%" h="100vh">
      <WrapItem>
        <Button
          leftIcon={<MdAddCircle />}
          colorScheme="green"
          mb={4}
          onClick={() => navigate('/suppliers-categories/new')}
        >
          Novo
        </Button>
      </WrapItem>
      <Card justify="center" p="30px">
        <SuppliersCategoryTable suppliersCategories={data?.data?.data} />
      </Card>
    </Box>
  );
}
