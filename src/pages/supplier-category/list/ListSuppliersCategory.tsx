import { Box, Button, Card, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuppliersCategoryTable from "./SuppliersCategoryTable";
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SupplierCategoryInterface } from "../../../modules/supplier-category/interfaces/supplier-category.interface";
import supplierCategoryService from "../../../modules/supplier-category/services/supplier-category.service";

export default function ListSuppliersCategory() {
  const [suppliersCategories, setSuppliersCategories] = useState<SupplierCategoryInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supplierCategoryService
      .getAll()
      .then((response: any) => {
        setSuppliersCategories(response.data.data);
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
          onClick={() => navigate("/suppliers-categories/new")}
        >
          Novo
        </Button>
      </WrapItem>
      <Card justify="center" p="30px">
        <SuppliersCategoryTable suppliersCategories={suppliersCategories} />
      </Card>
    </Box>
  );
}
