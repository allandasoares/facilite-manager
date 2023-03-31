import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/table/Table';
import { ProductInterface } from '../../../modules/product/interfaces/product.interface';

interface ProductsTableProps {
  products: ProductInterface[] | undefined;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const navigate = useNavigate();
  if (!products) {
    return <div>Loading...</div>;
  }
  const columns = [
    { header: 'Nome', accessor: 'name' },
    { header: 'Descrição', accessor: 'description' },
    { header: 'Preço', accessor: 'price' },
    { header: 'Preço Atualizado em', accessor: 'priceUpdatedAt' },
    {
      header: 'Cat. Produto',
      accessor: (item: any) => item?.productCategory?.name,
    },
    {
      header: 'Fornecedor',
      accessor: (item: any) => item?.supplier?.companyName,
    },
    {
      header: 'Variações',
      accessor: (item: any) => (
        <Button
          onClick={() => navigate(`/products/${item.id}/variations`)}
        >
          Variações
        </Button>
      ),
    },
  ];

  return <Table data={products} columns={columns} />;
};

export default ProductsTable;
