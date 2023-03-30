import { Box, Button, Card, WrapItem } from "@chakra-ui/react";
import SuppliersCategoryTable from "./SuppliersCategoryTable";
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import supplierCategoryService from "../../../modules/supplier-category/services/supplier-category.service";
import { useQuery } from "react-query";

export default function ListSuppliersCategory() {
  const navigate = useNavigate();

  const { data } = useQuery(
    "suppliers-category",
    supplierCategoryService.getAll
  );
  
  return (
    <Box w="100%" h="100vh">
      <WrapItem>
        <Button
          leftIcon={<MdAddCircle />}
          colorScheme="green"
          mb={4}
          onClick={() => navigate("/suppliers-categories/new")}
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
