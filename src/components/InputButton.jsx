import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Circle from "./Circle";

function InputButton({ colorMode, todo, setTodo, addTodo }) {
  return (
    <Flex
      m={"2.5em 0"}
      background={colorMode === "light" ? "white" : "#1a202c"}
      p={"2"}
      borderRadius={"0.5em"}
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents={"none"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Circle
            width={{ base: "15px", md: "22px" }}
            height={{ base: "15px", md: "22px" }}
            colorMode={colorMode}
          />
        </InputLeftElement>
        <Input
          fontWeight={"400"}
          fontSize={{ base: "14px", md: "22px" }}
          type="text"
          h={"2em"}
          variant={"unstyled"}
          placeholder="Create a new todo..."
          ml={".5em"}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={addTodo}
        />
      </InputGroup>
    </Flex>
  );
}

export default InputButton;
