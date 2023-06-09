import { Button } from "@chakra-ui/react";
import React from "react";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/table/Table";
import { SupplierCategoryInterface } from "../../../modules/supplier-category/interfaces/supplier-category.interface";

interface SuppliersCategoryTableProps {
  suppliersCategories: SupplierCategoryInterface[] | undefined;
}

const SuppliersCategoryTable: React.FC<SuppliersCategoryTableProps> = ({
  suppliersCategories,
}) => {
  const navigate = useNavigate();
  if (!suppliersCategories) {
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
          onClick={() => navigate(`/suppliers-categories/edit/${item.id}`)}
        >
          Editar
        </Button>
      ),
    },
  ];

  return <Table data={suppliersCategories} columns={columns} />;
};

export default SuppliersCategoryTable;
