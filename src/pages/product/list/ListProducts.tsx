import { Box, Button, Card, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ProductInterface } from "../../../modules/product/interfaces/product.interface";
import productService from "../../../modules/product/services/product.service";
import ProductsTable from "./ProductsTable";

export default function ListProducts() {
  const [products, setProduct] = useState<ProductInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    productService
      .getAll()
      .then((response: any) => {
        setProduct(response.data.data);
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
          onClick={() => navigate("/products/new")}
        >
          Novo
        </Button>
      </WrapItem>
      <Card justify="center" p="30px">
        <ProductsTable products={products} />
      </Card>
    </Box>
  );
}
