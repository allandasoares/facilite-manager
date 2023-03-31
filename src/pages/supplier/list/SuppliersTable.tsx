import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/table/Table';
import { SupplierInterface } from '../../../modules/supplier/interfaces/supplier.interface';

interface SupplierTableProps {
  suppliers: SupplierInterface[] | undefined;
}

const SupplierTable: React.FC<SupplierTableProps> = ({ suppliers }) => {
  const navigate = useNavigate();
  if (!suppliers) {
    return <div>Loading...</div>;
  }
  const columns = [
    { header: 'Razão Social', accessor: 'companyName' },
    { header: 'Nome Fantasia', accessor: 'tradingName' },
    { header: 'CNPJ', accessor: 'cnpj' },
    { header: 'email', accessor: 'email' },
    { header: 'Telefone Fixo', accessor: 'phoneNumber' },
    { header: 'Celular', accessor: 'mobileNumber' },
    { header: 'segment', accessor: 'segment' },
    {
      header: 'Ações',
      accessor: (item: any) => (
        <Button
          onClick={() => navigate(`/suppliers/edit/${item.id}`)}
        >
          Editar
        </Button>
      ),
    },
  ];

  return <Table data={suppliers} columns={columns} />;
};

export default SupplierTable;
