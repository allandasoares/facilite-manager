import { Box, Button, Card, WrapItem } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import featureService from "../../../modules/feature/services/feature.service";
import FeaturesTable from "./FeaturesTable";

export default function ListFeatures() {
  const navigate = useNavigate();

  const { data } = useQuery("features", featureService.getAll);

  return (
    <Box w="100%" h="100vh">
      <WrapItem>
        <Button
          leftIcon={<MdAddCircle />}
          colorScheme="green"
          mb={4}
          onClick={() => navigate("/features/new")}
        >
          Novo
        </Button>
      </WrapItem>
      <Card justify="center" p="30px">
        <FeaturesTable features={data?.data?.data} />
      </Card>
    </Box>
  );
}
