import {
  Box, Card, Heading, Button,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { UpdateVariationInterface } from '../../../modules/variation/interfaces/update-variation.interface';
import variationService from '../../../modules/variation/services/variation.service';
import createVariationValidator from '../../../modules/variation/validators/create-variation.validator';
import VariationForm from '../VariationForm';

const initialValues: UpdateVariationInterface = {
  name: 'Cor',
};

export default function UpdateVariationPage() {
  const { variationId } = useParams();
  const { mutate } = useMutation(
    (data: UpdateVariationInterface) => variationService.update(+variationId!, {
      name: data.name,
    }),
    {
      onSuccess: () => {},
    },
  );
  const { data } = useQuery(['variation', variationId], () => variationService.getOne(+variationId!));

  const formik = useFormik({
    initialValues: data?.data.data || initialValues,
    onSubmit: () => { mutate(formik.values); },
    validationSchema: createVariationValidator,
    enableReinitialize: true, // This will update initialValues when data?.data.data changes
  });

  return (
    <Box w="100%" h="100vh">
      <Card justify="center" p="30px">
        <Heading fontWeight="bold" size="md" mb={4}>
          Editar Variação
        </Heading>
        <VariationForm formik={formik} />
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
