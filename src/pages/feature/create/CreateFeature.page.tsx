import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import featureService from "../../../modules/feature/services/feature.service";
import createFeatureValidator from "../../../modules/feature/validators/create-feature.validator";
import { CreateFeatureInterface } from "../../../modules/feature/interfaces/create-feature.interface";
import FeatureForm from "../FeatureForm";

const initialValues: CreateFeatureInterface = {
  name: "",
  icon: "",
};

export default function CreateFeaturePage() {
  const { mutate } = useMutation(featureService.create, {
    onSuccess: () => {
      alert("Sucesso!");
    },
  });
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      mutate(formik.values);
    },
    validationSchema: createFeatureValidator,
  });

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Nova Caracteristica
        </Heading>
        <FeatureForm formik={formik} />
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
