import React from "react";
import Table from "../../../components/table/Table";
import { ProductInterface } from "../../../modules/product/interfaces/product.interface";

interface ProductsTableProps {
  products: ProductInterface[] | undefined;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  if (!products) {
    return <div>Loading...</div>;
  }
  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "Descrição", accessor: "description" },
    { header: "Preço", accessor: "price" },
    { header: "Preço Atualizado em", accessor: "priceUpdatedAt" },
    { header: "Cat. Produto", accessor: "productCategoryId" },
    { header: "Fornecedor", accessor: "supplierId" },
  ];

  return <Table data={products} columns={columns} />;
};

export default ProductsTable;
