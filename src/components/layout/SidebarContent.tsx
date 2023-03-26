import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, CloseButton, Flex, Icon, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { FiCompass, FiHome, FiSettings, FiStar, FiTrendingUp } from "react-icons/fi";
import NavItem from "./NavItem";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Fornecedores", icon: FiTrendingUp, url: "/suppliers" },
  { name: "Cat. Fonecedores", icon: FiCompass, url: "/suppliers-categories" },
  { name: "Produtos", icon: FiStar, url: "/products" },
  { name: "Cat. Produtos", icon: FiSettings, url: "/products-categories" },
  { name: "Variações", icon: FiSettings, url: "/variations" },
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
