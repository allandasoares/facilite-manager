import {
  Box, Button, Card, WrapItem,
} from '@chakra-ui/react';
import { MdAddCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import SupplierTable from './SuppliersTable';
import supplierService from '../../../modules/supplier/services/supplier.service';

export default function ListSuppliersPage() {
  const navigate = useNavigate();
  const { data } = useQuery('suppliers', supplierService.getAll);

  return (
    <Box w="100%" h="100vh">
      <WrapItem>
        <Button
          leftIcon={<MdAddCircle />}
          colorScheme="green"
          mb={4}
          onClick={() => navigate('/suppliers/new')}
        >
          Novo
        </Button>
      </WrapItem>
      <Card justify="center" p="30px">
        <SupplierTable suppliers={data?.data?.data} />
      </Card>
    </Box>
  );
}
