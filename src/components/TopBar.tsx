import { Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate()

  return (
    <Box mt="60px">
      <Box
        w="100%"
        h="60px"
        background="#ffffff"
        position="fixed"
        top="0"
        left="0"
        zIndex="9999"
      >
        <Image src="/logo.png" alt="Dan Abramov" boxSize="40px" m="10px" onClick={() => navigate('/home')} />
      </Box>
    </Box>
  );
}
