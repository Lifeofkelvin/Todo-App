import { Box } from "@chakra-ui/react";
import React from "react";

function Circle({ width, height }) {
  return (
    <Box
      w={width}
      h={height}
      borderRadius={"50%"}
      border={'1px solid'}
    ></Box>
  );
}

export default Circle;
