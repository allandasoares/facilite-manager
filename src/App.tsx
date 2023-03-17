import { ChakraProvider, theme } from "@chakra-ui/react";
import Router from "./routes/router";

function App() {

  return (
    <>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </>
  );
}

export default App;
