import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Select,
  HStack,
  Grid,
  VStack,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import { MdOutlineClose } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import supplierService from "../../../modules/supplier/services/supplier.service";
import {
  getNameByUf,
  statesOfBrazil,
} from "../../../utils/geolocalization.helper";

export default function ActionAreasPage() {
  const { supplierId } = useParams();
  const [actionAreas, setActionAreas] = useState<any>([]);
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [cities, setCities] = useState([]);

  const { data, isLoading } = useQuery(
    ["supplier", supplierId],
    () => supplierService.getOne(+supplierId!),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!data) return;
    setActionAreas(data.data.data.actionAreas);
  }, [data]);

  const mutation = useMutation(
    (values: any) => {
      return supplierService.updateActionAreas(+supplierId!, values);
    },
    {
      onSuccess: () => {
        alert("Sucesso!");
      },
    }
  );

  const actionAreasByState = _.groupBy(actionAreas, "state");

  const handleAddState = () => {
    if (!newState || actionAreas.find((area: any) => area.state === newState))
      return;
    setActionAreas([...actionAreas, { state: newState, city: null }]);
    setNewState("");
  };

  const handleDeleteState = (stateToDelete: any) => {
    setActionAreas(
      actionAreas.filter(({ state }: any) => state !== stateToDelete)
    );
  };

  const handleAddCity = (state: any) => {
    if (!newCity) return;
    setActionAreas([...actionAreas, { state, city: newCity }]);
    setNewCity("");
  };

  const handleDeleteCity = (state: any, cityToDelete: any) => {
    if (!cityToDelete) return;
    setActionAreas(
      actionAreas.filter(
        ({ state: s, city }: any) => !(s === state && city === cityToDelete)
      )
    );
  };

  const processActionAreas = (actAreas: any) => {
    let processedActionAreas = [...actAreas];
    const statesWithCities = _.uniq(
      actAreas
        .filter(({ city }: any) => city !== null)
        .map(({ state }: any) => state)
    );
    processedActionAreas = processedActionAreas.filter(
      ({ state, city }) => !(statesWithCities.includes(state) && city === null)
    );
    return processedActionAreas;
  };

  const handleSubmit = () => {
    const processedActionAreas = processActionAreas(actionAreas);
    mutation.mutate({ actionAreas: processedActionAreas });
  };

  function fillCitiesSelect(uf: string) {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.toLowerCase()}/distritos?view=nivelado`
      )
      .then((response) => {
        setCities(response.data.map((city: any) => city["distrito-nome"]));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box p={5}>
      <Box
        p={5}
        borderRadius="lg"
        boxShadow="lg"
        borderWidth="1px"
        bg="white"
        mb={5}
      >
        <VStack align="start" spacing={5}>
          <Text fontSize="3xl">Áreas de atuação</Text>
          <FormControl w="100%">
            <FormLabel>Adicionar novo estado</FormLabel>
            <HStack spacing={2}>
              <Select
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                placeholder="Selecione um estado"
                w="100%"
              >
                {statesOfBrazil.map((state) => (
                  <option key={state.name} value={state.uf}>
                    {state.name}
                  </option>
                ))}
              </Select>
              <Button colorScheme="teal" onClick={handleAddState}>
                Adicionar
              </Button>
            </HStack>
          </FormControl>
        </VStack>
      </Box>

      {actionAreas.length === 0 ? (
        <Box
          borderWidth="1px"
          borderRadius="md"
          p={3}
          bg="teal.100"
          color="teal.900"
          textAlign="center"
          mt={3}
        >
          Este fornecedor cobre todo território nacional
        </Box>
      ) : (
        <>
          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={6}
            mt={10}
          >
            {Object.entries(actionAreasByState).map(
              ([state, actionAreasCity], index) => (
                <Box
                  key={index}
                  p={5}
                  borderRadius="lg"
                  boxShadow="lg"
                  borderWidth="1px"
                  bg="white"
                >
                  <Flex justify="space-between" align="center">
                    <Text fontSize="2xl">{getNameByUf(state)}</Text>
                    <IconButton
                      aria-label="Deletar Estado"
                      size="sm"
                      colorScheme="red"
                      icon={<MdOutlineClose />}
                      onClick={() => handleDeleteState(state)}
                    />
                  </Flex>
                  {(actionAreasCity as any).map(({ city }: any, i: number) => (
                    <Flex key={i} justify="space-between" align="center" mt={3}>
                      <Text fontSize="xl">{city || "Todas as cidades"}</Text>
                      <IconButton
                        aria-label="Deletar Cidade"
                        size="sm"
                        colorScheme="red"
                        icon={<MdOutlineClose />}
                        onClick={() => handleDeleteCity(state, city)}
                      />
                    </Flex>
                  ))}
                  <FormControl mt={5}>
                    <FormLabel>Adicionar nova cidade em {state}</FormLabel>
                    <HStack spacing={2}>
                      <ReactSelect
                        value={
                          newCity ? { label: newCity, value: newCity } : null
                        }
                        options={cities.map((city) => ({
                          label: city,
                          value: city,
                        }))}
                        onChange={(selectedOption) =>
                          setNewCity(selectedOption ? selectedOption.value : "")
                        }
                        onFocus={() => fillCitiesSelect(state)}
                        placeholder="Selecione uma cidade"
                        styles={{
                          container: (base) => ({ ...base, width: "100%" }),
                        }}
                      />
                      <Button
                        colorScheme="teal"
                        onClick={() => handleAddCity(state)}
                      >
                        Adicionar
                      </Button>
                    </HStack>
                  </FormControl>
                </Box>
              )
            )}
          </Grid>
        </>
      )}
      <Button colorScheme="teal" onClick={handleSubmit} mt={5}>
        Salvar
      </Button>
    </Box>
  );
}
