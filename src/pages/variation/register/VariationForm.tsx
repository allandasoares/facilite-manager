import { SimpleGrid } from '@chakra-ui/react';
import TextField from '../../../components/form/TextField';

const VariationForm = ({ formik }: any) => (
    <form onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={2} spacing={10}>
        <TextField id="name" label="Nome da variação" formik={formik} />
      </SimpleGrid>
    </form>
);

export default VariationForm;
