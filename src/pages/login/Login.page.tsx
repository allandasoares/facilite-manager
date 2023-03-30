import {
  Flex,
  Box,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Divider,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import TextField from "../../components/form/TextField";
import loginService from "../../modules/auth/services/auth.service";
import { loginValidator } from "../../modules/auth/validators/login.validator";
import { FcGoogle } from "react-icons/fc";

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    try {
      const { data } = await loginService.login(formik.values);
      console.log("Deu certo");
      localStorage.setItem("token", data.data);
      navigate("/home");
    } catch (error) {
      console.log("Deu Ruim");
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleOnSubmit,
    validationSchema: loginValidator,
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login Facilite Manager</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            feito por <Link color={"blue.400"}>Matheus e Allanda</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <TextField
                id="email"
                label="E-mail"
                type="email"
                formik={formik}
              />
              <TextField
                id="password"
                label="Senha"
                type="password"
                formik={formik}
              />
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Lembrar-me</Checkbox>
                  <Link color={"blue.400"}>Esqueci minha senha</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Entrar
                </Button>
                <Flex align="center" my={3}>
                  <Divider borderColor="gray.300" flex="1" />
                  <Text mx={2} color="gray.500" fontSize="sm">
                    ou entre com
                  </Text>
                  <Divider borderColor="gray.300" flex="1" />
                </Flex>
                {/* Google */}
                <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
                  <Center>
                    <Text>Entre com o Google</Text>
                  </Center>
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
