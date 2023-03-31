import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Badge,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { VariationOptionsInterface } from '../../../modules/variation-option/interfaces/variation-options.interface';
import variationOptionsService from '../../../modules/variation-option/services/variation-option.service';
import BaseCardWithForm from './BaseCardWithForm';
import AddNewCard from './AddNewCard';
import { CreateVariationOptionInterface } from '../../../modules/variation-option/interfaces/create-variation-option.interface';
import variationService from '../../../modules/variation/services/variation.service';

interface EditState {
  id: number | null;
  edit: boolean;
}
export default function CreateVariationOptionsPage() {
  const queryClient = useQueryClient();
  const { variationId } = useParams();
  const [editState, setEditState] = useState<EditState>({
    id: null,
    edit: false,
  });
  const { mutate: saveVariationOption } = useMutation(
    (data: CreateVariationOptionInterface) => variationOptionsService.create({
      name: data.name,
      variationId: +variationId!,
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['variation-options', variationId!]);
      },
    },
  );

  const { mutate: updateVariationOption } = useMutation(
    (data: any) => variationOptionsService.update(
      data.variationOptionId!,
      {
        name: data.name,
        variationId: +variationId!,
      },
    ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['variation-options', variationId!]);
      },
    },
  );

  const { data: variationsRes } = useQuery(['variation-options', variationId], () => variationService.getOne(+variationId!));

  return (
    <Box w="100%" h="100vh">
      <VStack spacing={4} align="start">
        <Heading as="h1" size="lg">
          {`Variação: ${variationsRes?.data?.data.name}`}
        </Heading>
        <Flex justifyContent="start" wrap="wrap" w="100%">
          <AddNewCard
            editState={editState}
            setEditState={setEditState}
            onSave={saveVariationOption}/>
            {variationsRes?.data?.data.variationsOptions.map(
              (variationOption: VariationOptionsInterface) => (
                <BaseCardWithForm
                  key={variationOption.id}
                  editState={editState}
                  setEditState={setEditState}
                  onSave={updateVariationOption}
                  variationOptionId={variationOption.id}
                  variationOptionName={variationOption.name}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    onClick={() => setEditState({ id: variationOption.id, edit: true })
                    }
                  >
                    <Text fontWeight="bold" fontSize="xl">
                      {variationOption.name}
                    </Text>
                    <Badge
                      borderRadius="full"
                      px={2}
                      colorScheme={variationOption.active ? 'green' : 'red'}
                    >
                      {variationOption.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </Stack>
                  <Text fontSize="sm" mt={2}>
                    Criado em:{' '}
                    {new Date(variationOption.createdAt!).toLocaleString()}
                  </Text>
                </BaseCardWithForm>
              ),
            )}
        </Flex>
      </VStack>
    </Box>
  );
}
