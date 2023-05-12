import { Box, Button, Card, Heading } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { UpdateFeatureInterface } from "../../../modules/feature/interfaces/update-feature.interface";
import featureService from "../../../modules/feature/services/feature.service";
import createFeatureValidator from "../../../modules/feature/validators/create-feature.validator";
import FeatureForm from "../FeatureForm";

const initialValues: UpdateFeatureInterface = {
  name: "",
  icon: "",
};

export default function UpdateFeaturePage() {
  const { featureId } = useParams();
  const { mutate } = useMutation(
    (data: UpdateFeatureInterface) =>
      featureService.update(+featureId!, {
        name: data.name,
        icon: data.icon,
      }),
    {
      onSuccess: () => {
        alert("Sucesso!");
      },
    }
  );
  const { data: featureReq } = useQuery(["feature", featureId], () =>
    featureService.getOne(+featureId!)
  );

  const formik = useFormik({
    initialValues: featureReq?.data.data || initialValues,
    onSubmit: () => {
      mutate(formik.values);
    },
    validationSchema: createFeatureValidator,
    enableReinitialize: true, // This will update initialValues when data?.data.data changes
  });

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Atualizar Caracteristica
        </Heading>
        <FeatureForm formik={formik} />
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
