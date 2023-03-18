import React from "react";
import Table from "../../../components/table/Table";
import { SupplierInterface } from "../../../modules/supplier/interfaces/supplier.interface";

interface SupplierTableProps {
  suppliers: SupplierInterface[] | undefined;
}

const SupplierTable: React.FC<SupplierTableProps> = ({ suppliers }) => {
  if (!suppliers) {
    return <div>Loading...</div>;
  }
  const columns = [
    { header: "companyName", accessor: "companyName" },
    { header: "tradingName", accessor: "tradingName" },
    { header: "cnpj", accessor: "cnpj" },
    { header: "email", accessor: "email" },
    { header: "phoneNumber", accessor: "phoneNumber" },
    { header: "mobileNumber", accessor: "mobileNumber" },
    { header: "street", accessor: "street" },
    { header: "number", accessor: "number" },
    { header: "neighborhood", accessor: "neighborhood" },
    { header: "city", accessor: "city" },
    { header: "state", accessor: "state" },
    { header: "zipCode", accessor: "zipCode" },
    { header: "segment", accessor: "segment" },
    { header: "website", accessor: "website" },
    { header: "description", accessor: "description" },
    { header: "logo", accessor: "logo" },
  ];

  return <Table data={suppliers} columns={columns} />;
};

export default SupplierTable;
