import { ChakraProvider } from "@chakra-ui/react"
import Router from "./routes/router"

function App() {

  return (
    <>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </>
  )
}

export default App
