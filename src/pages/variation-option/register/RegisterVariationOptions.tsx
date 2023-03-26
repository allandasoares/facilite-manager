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
} from "@chakra-ui/react";
import { VariationOptionsInterface } from "../../../modules/variation-option/interfaces/variation-options.interface";
import { VariationInterface } from "../../../modules/variation/interfaces/variation.interface";
import variationService from "../../../modules/variation/services/variation.service";
import { MdAddCircleOutline } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";

export default function RegisterVariationOptions() {
  const { variationId } = useParams();
  const [variationOptions, setVariationOptions] = useState<
    VariationOptionsInterface[]
  >([]);
  const [variation, setVariation] = useState<VariationInterface>();

  useEffect(() => {
    if (!variationId) return;

    variationService
      .getOne(+variationId)
      .then((response) => {
        setVariation(response.data.data);
        const a = response.data.data.variationsOptions;
        // create a new array but with 3 times content in a variable
        const b = [...a];
        setVariationOptions(b);
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
          <VariationOptionsCard
            onClick={() => {
              alert("NOVA OPÇÃO");
            }}
          >
            <VStack display="flex" justifyContent="center" alignItems="center">
              <chakra.a display={"flex"}>
                <Icon
                  as={MdAddCircleOutline}
                  h={8}
                  w={8}
                  alignSelf={"center"}
                />
              </chakra.a>
              <Text fontSize="medium">Criar nova opção</Text>
            </VStack>
          </VariationOptionsCard>

          {variationOptions.map(
            (variationOption: VariationOptionsInterface) => (
              <VariationOptionsCard
                onClick={() => {
                  alert(`EDITAR OPÇÃO ${variationOption.id}`);
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
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
              </VariationOptionsCard>
            )
          )}
        </Flex>
      </VStack>
    </Box>
  );
}

function VariationOptionsCard({ children, ...rest }: any) {
  return (
    <Box
      {...rest}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={2}
      backgroundColor="gray.50"
      minWidth={{ base: "100%", sm: "45%", md: "30%" }}
      width={{ base: "100%", sm: "45%", md: "30%" }}
      _hover={{
        boxShadow: "xl",
        backgroundColor: "gray.200",
        cursor: "pointer",
        transform: "scale(1.02)",
        transition: "all 0.2s",
      }}
    >
      {children}
    </Box>
  );
}
