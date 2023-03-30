import {
  Box,
  Button,
  Card,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import SearchableSelect from "../../../components/form/SearchableSelect";
import productVariationOptionService from "../../../modules/product-variation-option/services/product-variation-option.service";
import productVariationService from "../../../modules/product-variation/services/product-variation.service";
import { ProductInterface } from "../../../modules/product/interfaces/product.interface";
import productService from "../../../modules/product/services/product.service";
import { VariationInterface } from "../../../modules/variation/interfaces/variation.interface";
import variationService from "../../../modules/variation/services/variation.service";

export default function ProductVariations() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductInterface>();
  const [variationsOptions, setVariationsOptions] = useState([]);
  const [productVariations, setProductVariations] = useState<any>([]);

  const formik = useFormik({
    initialValues: { variationId: 0 },
    onSubmit: async (values) => {
      try {
        await productVariationService.create({
          productId: +productId!,
          variationId: values.variationId,
        });
      } catch (error) {}
    },
  });

  useEffect(() => {
    if (!productId) return;
    const variationsReq = variationService.getAll();
    const productReq = productService.getOneProductWithVariations(+productId);

    Promise.all([variationsReq, productReq]).then(async (values) => {
      const variationsResp = values[0].data;
      const productResp = values[1].data;
      const variationsOptions = variationsResp.data.map(
        (variation: VariationInterface) => {
          return {
            id: variation.id,
            label: variation.name,
          };
        }
      );

      const productVariationsResponse = productResp.data.productsVariations.map(
        (item: any) => {
          item.variation.productVariationId = item.id;
          return item.variation;
        }
      );

      setProduct(productResp.data);
      setVariationsOptions(variationsOptions);
      setProductVariations(productVariationsResponse);
    });
  }, [productId]);

  return (
    <Box w="100%" h="100vh">
      <Heading mb={2}>Produto: {product?.name}</Heading>
      <Card justify="center" p="30px">
        <form onSubmit={formik.handleSubmit}>
          <Flex>
            <Box w="50%" mr={4}>
              <SearchableSelect
                id="variationId"
                label="Variações"
                items={variationsOptions}
                formik={formik}
              />
            </Box>
            <div>
              <FormLabel>Adicionar Variação</FormLabel>
              <IconButton
                w={40}
                type="submit"
                colorScheme="green"
                aria-label="Save variation option"
                icon={<MdAddCircleOutline size={24} />}
              />
            </div>
          </Flex>
        </form>
      </Card>
      {productVariations.map((pv: any) => {
        return (
          <Card key={pv.id} justify="center" p="30px" mt={12}>
            <Heading>{pv.name}</Heading>
            <Flex gap={2} mt={4} justifyContent="flex-start" wrap="wrap">
              {pv.variationsOptions.map((vo: any) => {
                console.log(pv);
                return (
                  <VariationCard
                    option={vo}
                    onSave={() => {
                      if (vo.isLinked) {
                        productVariationOptionService.delete(
                          vo.productsVariationOptions[0].id
                        );
                      } else {
                        productVariationOptionService.create({
                          productVariationId: pv.productVariationId,
                          variationOptionId: vo.id,
                        });
                      }
                    }}
                    key={vo.id}
                  ></VariationCard>
                );
              })}
            </Flex>
          </Card>
        );
      })}
    </Box>
  );
}

function VariationCard({ option, onSave }: any) {
  return (
    <Box
      w="200px"
      h="100px"
      borderWidth="2px"
      borderRadius="lg"
      borderColor="gray.300"
      boxShadow="sm"
      p={4}
      bg="white"
      _hover={{ boxShadow: "md" }}
      transition="box-shadow 0.2s"
      key={option.id}
    >
      <Flex direction="column" justifyContent="space-around" h="100%" gap={2}>
        <Text fontWeight="bold" fontSize="lg" align="center">
          {option.name}
        </Text>
        <Button
          colorScheme={option.isLinked ? "red" : "green"}
          alignSelf="center"
          borderRadius="full"
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
          _active={{ boxShadow: "lg" }}
          onClick={onSave}
        >
          {option.isLinked ? "Remover" : "Adicionar"}
        </Button>
      </Flex>
    </Box>
  );
}
