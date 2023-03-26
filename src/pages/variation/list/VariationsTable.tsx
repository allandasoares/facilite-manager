import { Button } from "@chakra-ui/react";
import React from "react";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/table/Table";
import { VariationInterface } from "../../../modules/variation/interfaces/variation.interface";

interface VariationsTableProps {
  variations: VariationInterface[] | undefined;
}

const VariationsTable: React.FC<VariationsTableProps> = ({ variations }) => {
  const navigate = useNavigate();
  if (!variations) {
    return <div>Loading...</div>;
  }
  const columns = [
    { header: "Nome", accessor: "name" },
    {
      header: "Ativo",
      accessor: (item: any) =>
        item.active ? <MdOutlineCheck /> : <MdOutlineClose />,
    },
    {
      header: "Opções",
      accessor: (item: any) => (
        <Button onClick={() => navigate(`/variations-options/variations/${item.id}`)}>
          Opções
        </Button>
      ),
    },
  ];

  return <Table data={variations} columns={columns} />;
};

export default VariationsTable;
