import { Button, Divider, Link, Text, useColorMode } from "@chakra-ui/react";

export default function Home() {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Text>Home</Text>
      <Link href="/register">Register New Supplier</Link>
      <Divider />
      <Link href="/list">List Suppliers</Link>
      <Button onClick={toggleColorMode}>Toggle theme</Button>
    </>
  );
}
