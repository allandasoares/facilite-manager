import { Flex, Link, Icon } from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";

interface NavItemProps {
  icon: IconType;
  children: ReactText;
  onClick: () => void;
}

export default function NavItem({ icon, children, onClick }: NavItemProps) {
  return (
    <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        onClick={onClick}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}
