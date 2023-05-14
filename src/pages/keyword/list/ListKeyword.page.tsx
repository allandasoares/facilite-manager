import { Box, Button, Card, WrapItem } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import keywordService from "../../../modules/keyword/services/keyword.service";
import KeywordTable from "./KeywordTable";

export default function ListKeywordPage() {
  const navigate = useNavigate();

  const { data } = useQuery("keywords", keywordService.getAll);

  return (
    <Box w="100%" h="100vh">
      <WrapItem>
        <Button
          leftIcon={<MdAddCircle />}
          colorScheme="green"
          mb={4}
          onClick={() => navigate("/keywords/new")}
        >
          Novo
        </Button>
      </WrapItem>
      <Card justify="center" p="30px">
        <KeywordTable keywords={data?.data?.data} />
      </Card>
    </Box>
  );
}
