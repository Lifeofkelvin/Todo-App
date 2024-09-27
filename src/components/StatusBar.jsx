import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function StatusBar({
  colorMode,
  itemLeft,
  handleClearAllClick,
  handleAllClick,
  handleCompletedClick,
  handleActiveClick,
}) {
  const [inMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 700) setIsMobileView(true);
      else setIsMobileView(false);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box fontWeight={"700"} color={"grey"}>
      {setIsMobileView && (
        <Flex flexDirection={"column"}>
          <Flex
            h={"3em"}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderRadius={"0px 0px 10px 10px"}
            p={"14px"}
            background={colorMode === "light" ? "#f3fcec" : "#242e41"}
          >
            <Text fontSize={{ base: "10px", md: "14px" }}>
              {itemLeft} {itemLeft > 1 ? "items" : "item"} Left
            </Text>
            <Flex justifyContent={"center"} align={"center"} gap={"16px"}>
              <Text
                fontSize={{ base: "12px", md: "14px" }}
                onClick={handleAllClick}
                cursor={"pointer"}
                _hover={{ color: colorMode === "light" ? "black" : "white" }}
              >
                All
              </Text>

              <Text
                fontSize={{ base: "10px", md: "14px" }}
                onClick={handleActiveClick}
                cursor={"pointer"}
                _hover={{ color: colorMode === "light" ? "black" : "white" }}
              >
                Active
              </Text>

              <Text
                fontSize={{ base: "10px", md: "14px" }}
                onClick={handleCompletedClick}
                cursor={"pointer"}
                _hover={{ color: colorMode === "light" ? "black" : "white" }}
              >
                Completed
              </Text>
            </Flex>
            <Text
              fontSize={{ base: "10px", md: "14px" }}
              onClick={handleClearAllClick}
              cursor={"pointer"}
              _hover={{ color: colorMode === "light" ? "black" : "white" }}
            >
              Clear Completed
            </Text>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

export default StatusBar;
