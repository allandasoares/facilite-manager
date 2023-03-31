import {
  Box, Button, Card, WrapItem,
} from '@chakra-ui/react';
import { MdAddCircle } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import variationService from '../../../modules/variation/services/variation.service';
import VariationsTable from './VariationsTable';

export default function ListVariationsPage() {
  const navigate = useNavigate();
  const { data } = useQuery('variations', variationService.getAll);

  return (
    <Box w="100%" h="100vh">
      <WrapItem>
        <Button
          leftIcon={<MdAddCircle />}
          colorScheme="green"
          mb={4}
          onClick={() => navigate('/variations/new')}
        >
          Novo
        </Button>
      </WrapItem>
      <Card justify="center" p="30px">
        <VariationsTable variations={data?.data?.data} />
      </Card>
    </Box>
  );
}
