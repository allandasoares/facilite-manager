import { Button } from "@chakra-ui/react";
import React from "react";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/table/Table";
import { FeatureInterface } from "../../../modules/feature/interfaces/feature.interface";

interface FeaturesTableProps {
  features: FeatureInterface[] | undefined;
}

const FeaturesTable: React.FC<FeaturesTableProps> = ({ features }) => {
  const navigate = useNavigate();
  if (!features) {
    return <div>Loading...</div>;
  }
  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "Icone", accessor: "icon" },
    {
      header: "Ativo",
      accessor: (item: any) =>
        item.active ? <MdOutlineCheck /> : <MdOutlineClose />,
    },
    {
      header: "Ações",
      accessor: (item: any) => (
        <Button onClick={() => navigate(`/features/edit/${item.id}`)}>
          Editar
        </Button>
      ),
    },
  ];

  return <Table data={features} columns={columns} />;
};

export default FeaturesTable;
