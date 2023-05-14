import { Button } from "@chakra-ui/react";
import React from "react";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/table/Table";
import { KeywordInterface } from "../../../modules/keyword/interfaces/keyword.interface";

interface KeywordsTableProps {
  keywords: KeywordInterface[] | undefined;
}

const KeywordsTable: React.FC<KeywordsTableProps> = ({ keywords }) => {
  const navigate = useNavigate();
  if (!keywords) {
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
      header: "Ações",
      accessor: (item: any) => (
        <Button onClick={() => navigate(`/keywords/edit/${item.id}`)}>
          Editar
        </Button>
      ),
    },
  ];

  return <Table data={keywords} columns={columns} />;
};

export default KeywordsTable;
