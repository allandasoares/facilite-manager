import { useNavigate } from "react-router-dom";
import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  FiBookmark,
  FiBox,
  FiHome,
  FiPaperclip,
  FiShuffle,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import NavItem from "./NavItem";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Fornecedores", icon: FiUsers, url: "/suppliers" },
  { name: "Cat. Fonecedores", icon: FiTag, url: "/suppliers-categories" },
  { name: "Produtos", icon: FiBox, url: "/products" },
  { name: "Cat. Produtos", icon: FiPaperclip, url: "/products-categories" },
  { name: "Variações", icon: FiShuffle, url: "/variations" },
  { name: "Caracteristicas", icon: FiBookmark, url: "/features" },
];

interface SidebarProps {
  onClose: () => void;
  display?: { base: string; md: string };
}

export default function SidebarContent({ onClose, display }: SidebarProps) {
  const navigate = useNavigate();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      display={display}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Facilite
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => {
            navigate(link.url);
          }}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}
