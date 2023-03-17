import {
    Box,
    Card,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Text,
    Grid,
    SimpleGrid,
    Heading,
    Button,
} from "@chakra-ui/react";
import TopBar from "../../../components/TopBar";
import { useFormik } from "formik";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";

type InfoSupplier = {
    companyName: string,
    tradingName: string,
    cnpj: string,
    email: string,
    phoneNumber: string,
    mobileNumber: string,
    street: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string,
    segment: string,
    website: string,
    description: string,
    logo: string
}


export default function Register() {
    const navigate = useNavigate()
    const initialValues: InfoSupplier = {
        companyName: "Empresa Teste",
        tradingName: "Empresinha",
        cnpj: "1234567892",
        email: "a2@a.com",
        phoneNumber: "1934353705",
        mobileNumber: "19983136930",
        street: "Rua dos amores",
        number: "127",
        neighborhood: "São Jorge",
        city: "Piracicaba",
        state: "São Paulo",
        zipCode: "13402803",
        segment: "Metalorgico",
        website: "https://google.com",
        description: "descricao",
        logo: "logo"
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (event: InfoSupplier) => {
            handleOnSubmit(event);
        },
    });

    const handleOnSubmit = (event: InfoSupplier) => {
        api.post('/suppliers', formik.values)
            .then((response) => {
                console.log("Deu certo em", response)
                navigate('/home')
            })
            .catch((error) => {
                console.log("Deu merda em", error)
            })
    }

    return (
        <Box w="100%" h="100vh" overflow="scroll" background="#f2f5f8">
            <TopBar />
            <Card justify="center" m="100px" p="30px" background="#ffffff">
                <Heading fontWeight="bold" size="md" mb={4}>
                    New supplier
                </Heading>
                <form onSubmit={formik.handleSubmit}>
                    <SimpleGrid columns={2} spacing={10}>
                        <FormControl>
                            <FormLabel>Company Name</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Trading Name</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>CNPJ</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>E-mail</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Phone Number</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Mobile Number</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Street</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Number</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Neighborhood</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>State</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Zip Code</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Website</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Logo</FormLabel>
                            <Input type="text" />
                        </FormControl>
                    </SimpleGrid>
                    <Button colorScheme="blue" type="submit">Create</Button>
                </form>
            </Card>
        </Box>
    );
}
