import { Button, Divider, Link, Text, useColorMode } from "@chakra-ui/react";

export default function Home() {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Text>Home</Text>
      <Button onClick={toggleColorMode}>Toggle theme</Button>
    </>
  );
}
