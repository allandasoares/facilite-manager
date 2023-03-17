import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TopBar from "../../../components/TopBar";
import { api } from "../../../services/api";

export default function List() {
    const [supplier, setSupplier] = useState({ companyName: 'TESTE' })

    useEffect(() => {
        api.get('/suppliers')
            .then((response) => {
                console.log("Te amoooooooooo", response.data.data)
            })
            .catch((error) => {
                console.log("Deu erro aqui em", error)
            })
    }, [])

    return (
        <>
            <TopBar />
            <TableContainer>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>{supplier?.companyName}</Th>
                            <Th>tradingName</Th>
                            <Th>cnpj</Th>
                            <Th>email</Th>
                            <Th>phoneNumber</Th>
                            <Th>mobileNumber</Th>
                            <Th>street</Th>
                            <Th>number</Th>
                            <Th>neighborhood</Th>
                            <Th>city</Th>
                            <Th>state</Th>
                            <Th>zipCode</Th>
                            <Th>segment</Th>
                            <Th>website</Th>
                            <Th>description</Th>
                            <Th>logo</Th>
                            {/* <Th isNumeric>multiply by</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>companyName</Td>
                            <Td>tradingName</Td>
                            <Td>cnpj</Td>
                            <Td>email</Td>
                            <Td>phoneNumber</Td>
                            <Td>mobileNumber</Td>
                            <Td>street</Td>
                            <Td>number</Td>
                            <Td>neighborhood</Td>
                            <Td>city</Td>
                            <Td>state</Td>
                            <Td>zipCode</Td>
                            <Td>segment</Td>
                            <Td>website</Td>
                            <Td>description</Td>
                            <Td>logo</Td>
                        </Tr>
                    </Tbody>
                    {/* <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot> */}
                </Table>
            </TableContainer>
        </>
    )
}