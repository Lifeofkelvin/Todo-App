import { Button, Flex, Heading, Image } from "@chakra-ui/react";
import MoonIcon from "/assets/images/icon-moon.svg";
import SunIcon from "/assets/images/icon-sun.svg";

function Header({ colorMode, toggleColorMode }) {
  return (
    <Flex justifyContent={"space-between"}>
      <Heading as={"h2"} size={"xl"} color={"white"} letterSpacing={".5em"}>
        TODO
      </Heading>
      <Button
        border={"none"}
        background={"transparent"}
        variant={"ghost"}
        onClick={toggleColorMode}
        _active={"none"}
        _hover={"none"}
      >
        <Image
          src={colorMode === "light" ? MoonIcon : SunIcon}
          w={{ base: "17px", md: "30px" }}
        />
      </Button>
    </Flex>
  );
}

export default Header;
