import { Box, Card, Heading, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { CreateVariationInterface } from "../../../modules/variation/interfaces/create-variation.interface";
import variationService from "../../../modules/variation/services/variation.service";
import { createVariationValidator } from "../../../modules/variation/validators/create-variation.validator";
import VariationForm from "./VariationForm";

const initialValues: CreateVariationInterface = {
  name: "Cor",
};

export default function RegisterVariation() {
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    try {
      await variationService.create(formik.values);
      console.log("Deu certo");
    } catch (error) {
      console.log("Deu Ruim");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleOnSubmit,
    validationSchema: createVariationValidator,
  });

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          New variation
        </Heading>
        <VariationForm formik={formik} />
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
