import { Button } from "@chakra-ui/react";
import React from "react";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/table/Table";
import { ProductCategoryInterface } from "../../../modules/product-category/interfaces/supplier-product.interface";

interface ProductsCategoryTableProps {
  productsCategories: ProductCategoryInterface[] | undefined;
}

const ProductsCategoryTable: React.FC<ProductsCategoryTableProps> = ({
  productsCategories,
}) => {
  const navigate = useNavigate();
  if (!productsCategories) {
    return <div>Loading...</div>;
  }
  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "Pai", accessor: (item: any) => item.parent?.name || "-" },
    {
      header: "Ativo",
      accessor: (item: any) =>
        item.active ? <MdOutlineCheck /> : <MdOutlineClose />,
    },
    {
      header: "Ações",
      accessor: (item: any) => (
        <Button
          onClick={() => navigate(`/products-categories/edit/${item.id}`)}
        >
          Editar
        </Button>
      ),
    },
  ];

  return <Table data={productsCategories} columns={columns} />;
};

export default ProductsCategoryTable;
