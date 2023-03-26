import { Box, Button, Card, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SupplierInterface } from "../../../modules/supplier/interfaces/supplier.interface";
import supplierService from "../../../modules/supplier/services/supplier.service";
import SupplierTable from "./SuppliersTable";
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ListSuppliers() {
  const [suppliers, setSuppliers] = useState<SupplierInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supplierService
      .getAll()
      .then((response: any) => {
        setSuppliers(response.data.data);
      })
      .catch((error: any) => {
        console.log("Deu erro aqui em", error);
      });
  }, []);

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
        <SupplierTable suppliers={suppliers} />
      </Card>
    </Box>
  );
}
