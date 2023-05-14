import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { CreateKeywordInterface } from "../../../modules/keyword/interfaces/create-keyword.interface";
import keywordService from "../../../modules/keyword/services/keyword.service";
import createKeywordValidator from "../../../modules/keyword/validators/create-keyword.validator";
import KeywordForm from "../KeywordForm";

const initialValues: CreateKeywordInterface = {
  name: "",
};

export default function CreateKeywordPage() {
  const { mutate } = useMutation(keywordService.create, {
    onSuccess: () => {
      alert("Sucesso!");
    },
  });
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      mutate(formik.values);
    },
    validationSchema: createKeywordValidator,
  });

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Nova palavra-chave
        </Heading>
        <KeywordForm formik={formik} />
        <Button
          colorScheme="blue"
          mt="5"
          type="submit"
          onClick={() => formik.handleSubmit()}
        >
          Create
        </Button>
      </Card>
    </Box>
  );
}
