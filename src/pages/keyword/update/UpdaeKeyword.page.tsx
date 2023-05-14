import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { UpdateKeywordInterface } from "../../../modules/keyword/interfaces/update-keyword.interface";
import keywordService from "../../../modules/keyword/services/keyword.service";
import createKeywordValidator from "../../../modules/product-category/validators/create-product-category.validator";
import KeywordForm from "../KeywordForm";

const initialValues: UpdateKeywordInterface = {
  name: "",
};

export default function UpdateKeywordPage() {
  const { keywordId } = useParams();
  const { mutate } = useMutation(
    (data: UpdateKeywordInterface) =>
      keywordService.update(+keywordId!, {
        name: data.name,
      }),
    {
      onSuccess: () => {
        alert("Sucesso!");
      },
    }
  );
  const { data: keywordReq } = useQuery(["keyword", keywordId], () =>
    keywordService.getOne(+keywordId!)
  );

  const formik = useFormik({
    initialValues: keywordReq?.data.data || initialValues,
    onSubmit: () => {
      mutate(formik.values);
    },
    validationSchema: createKeywordValidator,
    enableReinitialize: true, // This will update initialValues when data?.data.data changes
  });

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Atualizar palavra-chave
        </Heading>
        <KeywordForm formik={formik} />
        <Button
          colorScheme="blue"
          mt="5"
          type="submit"
          onClick={() => formik.handleSubmit()}
        >
          Update
        </Button>
      </Card>
    </Box>
  );
}
