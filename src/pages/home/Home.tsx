import { Divider, Link, Text } from "@chakra-ui/react";

export default function Home() {
    return (
        <>
            <Text>Home</Text>
            <Link href="/register">Register New Supplier</Link>
            <Divider />
            <Link href="/list">List Suppliers</Link>
        </>
    )
}