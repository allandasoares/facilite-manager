import React from "react";
import {
  Table as ChakraTable,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

interface Column {
  header: string;
  accessor: string | Function;
}

interface TableProps {
  data: any[];
  columns: Column[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => (
  <TableContainer>
    <ChakraTable size="sm">
      <Thead>
        <Tr>
          {columns.map((column, index) => (
            <Th key={index}>{column.header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <Tr key={index}>
            {columns.map((column, colIndex) => (
              <Td key={colIndex}>
                {typeof column.accessor === "function"
                  ? column.accessor(item)
                  : item[column.accessor]}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  </TableContainer>
);

export default Table;
