import { Box, Button, Card, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { VariationInterface } from "../../../modules/variation/interfaces/variation.interface";
import variationService from "../../../modules/variation/services/variation.service";
import VariationsTable from "./VariationsTable";

export default function ListVariations() {
  const [variations, setVariation] = useState<VariationInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    variationService
      .getAll()
      .then((response: any) => {
        setVariation(response.data.data);
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
          onClick={() => navigate("/variations/new")}
        >
          Novo
        </Button>
      </WrapItem>
      <Card justify="center" p="30px">
        <VariationsTable variations={variations} />
      </Card>
    </Box>
  );
}
