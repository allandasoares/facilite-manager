import { Box, Button, Card, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ProductCategoryInterface } from "../../../modules/product-category/interfaces/supplier-product.interface";
import productCategoryService from "../../../modules/product-category/services/product-category.service";
import ProductsCategoryTable from "./ProductsCategoryTable";

export default function ListProductsCategory() {
  const [productsCategories, setProductsCategories] = useState<ProductCategoryInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    productCategoryService
      .getAll()
      .then((response: any) => {
        setProductsCategories(response.data.data);
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
          onClick={() => navigate("/products-categories/new")}
        >
          Novo
        </Button>
      </WrapItem>
      <Card justify="center" p="30px">
        <ProductsCategoryTable productsCategories={productsCategories} />
      </Card>
    </Box>
  );
}
