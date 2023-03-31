import {
  Box,
  Card,
  Flex,
  FormLabel,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import SearchableSelect from '../../../components/form/SearchableSelect';
import { CreateProductVariationOptionInterface } from '../../../modules/product-variation-option/interfaces/create-product-variation-option.interface';
import productVariationOptionService from '../../../modules/product-variation-option/services/product-variation-option.service';
import productVariationService from '../../../modules/product-variation/services/product-variation.service';
import { ProductInterface } from '../../../modules/product/interfaces/product.interface';
import productService from '../../../modules/product/services/product.service';
import { VariationInterface } from '../../../modules/variation/interfaces/variation.interface';
import variationService from '../../../modules/variation/services/variation.service';
import VariationCard from './VariationCard';

export default function ProductVariationsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductInterface>();
  const [variationsOptions, setVariationsOptions] = useState([]);
  const [productVariations, setProductVariations] = useState<any>([]);
  const queryClient = useQueryClient();

  const { mutate: createProductVariation } = useMutation(
    productVariationService.create,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['product-with-variations', +productId!]);
      },
    },
  );

  const formik = useFormik({
    initialValues: { variationId: 0 },
    onSubmit: () => {
      createProductVariation({
        productId: +productId!,
        variationId: formik.values.variationId,
      });
    },
  });

  const { data: variationsReq } = useQuery(
    'variations',
    variationService.getAll,
    {
      select: (data) => data.data.data.map((variation: VariationInterface) => ({
        id: variation.id,
        label: variation.name,
      })),
    },
  );
  const { data: productReq } = useQuery(
    ['product-with-variations', +productId!],
    () => productService.getOneProductWithVariations(+productId!),
  );
  const { mutate: deleteProductVariationOption } = useMutation(
    (id: number) => productVariationOptionService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['product-with-variations', +productId!]);
      },
    },
  );
  const { mutate: createProductVariationOption } = useMutation(
    ({
      productVariationId,
      variationOptionId,
    }: CreateProductVariationOptionInterface) => productVariationOptionService.create({
      productVariationId,
      variationOptionId,
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['product-with-variations', +productId!]);
      },
    },
  );

  useEffect(() => {
    if (!variationsReq || !productReq) return;

    const productVariationsResponse = productReq.data.data.productsVariations.map((item: any) => {
      item.variation.productVariationId = item.id;
      return item.variation;
    });

    setProduct(productReq.data.data);
    setVariationsOptions(variationsReq);
    setProductVariations(productVariationsResponse);
  }, [variationsReq, productReq]);

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
      {productVariations.map((pv: any) => (
          <Card key={pv.id} justify="center" p="30px" mt={12}>
            <Heading>{pv.name}</Heading>
            <Flex gap={2} mt={4} justifyContent="flex-start" wrap="wrap">
              {pv.variationsOptions.map((vo: any) => (
                  <VariationCard
                    option={vo}
                    onSave={() => {
                      if (vo.isLinked) {
                        deleteProductVariationOption(
                          vo.productsVariationOptions[0].id,
                        );
                      } else {
                        createProductVariationOption({
                          productVariationId: pv.productVariationId,
                          variationOptionId: vo.id,
                        });
                      }
                    }}
                    key={vo.id}
                  ></VariationCard>
              ))}
            </Flex>
          </Card>
      ))}
    </Box>
  );
}
