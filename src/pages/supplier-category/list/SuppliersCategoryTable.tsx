import React from "react";
import Table from "../../../components/table/Table";
import { SupplierCategoryInterface } from "../../../modules/supplier-category/interfaces/supplier-category.interface";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";

interface SuppliersCategoryTableProps {
  suppliersCategories: SupplierCategoryInterface[] | undefined;
}

const SuppliersCategoryTable: React.FC<SuppliersCategoryTableProps> = ({
  suppliersCategories,
}) => {
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
  ];

  return <Table data={suppliersCategories} columns={columns} />;
};

export default SuppliersCategoryTable;
