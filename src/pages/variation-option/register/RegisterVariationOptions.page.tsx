import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  chakra,
  Icon,
  Input,
  IconButton,
  CheckboxIcon,
} from "@chakra-ui/react";
import { VariationOptionsInterface } from "../../../modules/variation-option/interfaces/variation-options.interface";
import { VariationInterface } from "../../../modules/variation/interfaces/variation.interface";
import variationService from "../../../modules/variation/services/variation.service";
import { MdAddCircleOutline, MdCancel } from "react-icons/md";
import variationOptionsService from "../../../modules/variation-option/services/variation-option.service";
import BaseCardWithForm from "./BaseCardWithForm";
import AddNewCard from "./AddNewCard";

export default function RegisterVariationOptions() {
  const { variationId } = useParams();
  const [variationOptions, setVariationOptions] = useState<
    VariationOptionsInterface[]
  >([]);
  const [variation, setVariation] = useState<VariationInterface>();
  const [editState, setEditState] = useState<{
    id: number | null;
    edit: boolean;
  }>({
    id: null,
    edit: false,
  });
  const saveVariationOption = (name: string) => {
    variationOptionsService
      .create({
        name,
        variationId: +variationId!,
      })
      .then((response) => {
        setVariationOptions([...variationOptions, response.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateVariationOption = (name: string, id: number) => {
    variationOptionsService
      .update(id, {
        name,
        variationId: +variationId!,
      })
      .then((response) => {
        setVariationOptions(
          variationOptions.map((variationOption) =>
            variationOption.id === id ? response.data.data : variationOption
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!variationId) return;

    variationService
      .getOne(+variationId)
      .then((response) => {
        setVariation(response.data.data);
        setVariationOptions(response.data.data.variationsOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [variationId]);

  return (
    <Box w="100%" h="100vh">
      <VStack spacing={4} align="start">
        <Heading as="h1" size="lg">
          {`Variação: ${variation?.name}`}
        </Heading>
        <Flex justifyContent="start" wrap="wrap" w="100%">
          <AddNewCard editState={editState} setEditState={setEditState} onSave={saveVariationOption}/>
          {variationOptions.map(
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
                  onClick={() =>
                    setEditState({ id: variationOption.id, edit: true })
                  }
                >
                  <Text fontWeight="bold" fontSize="xl">
                    {variationOption.name}
                  </Text>
                  <Badge
                    borderRadius="full"
                    px={2}
                    colorScheme={variationOption.active ? "green" : "red"}
                  >
                    {variationOption.active ? "Ativo" : "Inativo"}
                  </Badge>
                </Stack>
                <Text fontSize="sm" mt={2}>
                  Criado em:{" "}
                  {new Date(variationOption.createdAt!).toLocaleString()}
                </Text>
              </BaseCardWithForm>
            )
          )}
        </Flex>
      </VStack>
    </Box>
  );
}
