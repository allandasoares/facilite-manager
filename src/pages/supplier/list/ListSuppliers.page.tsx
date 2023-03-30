import { Box, Button, Card, WrapItem } from "@chakra-ui/react";
import supplierService from "../../../modules/supplier/services/supplier.service";
import SupplierTable from "./SuppliersTable.page";
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

export default function ListSuppliers() {
  const navigate = useNavigate();
  const { data } = useQuery("suppliers", supplierService.getAll);

  return (
    <Box w="100%" h="100vh">
      <WrapItem>
        <Button
          leftIcon={<MdAddCircle />}
          colorScheme="green"
          mb={4}
          onClick={() => navigate("/suppliers/new")}
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
