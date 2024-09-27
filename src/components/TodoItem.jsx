import { Flex, Box, Image, Text, CloseButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import checkIcon from "/assets/images/icon-check.svg";
import Circle from "./Circle";
import { isTodoCompleted } from "../components/actions/index";

function TodoItem({ todo, colorMode, handleCompletedTodo, handleDeleteTodo }) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = async () => {
    await handleCompletedTodo(todo.id);
    setIsCompleted(!isCompleted);
  };

  useEffect(() => {
    setIsCompleted(todo.isCompleted);
  }, [todo.id, todo.isCompleted]);

  return (
    <Flex
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      alignItems={"center"}
      w={"100%"}
      p={{ base: "10px", md: "15px" }}
      h={{ base: "2.5em", md: "3.5em" }}
      borderBottom={"1px solid grey"}
    >
      <Box cursor={"pointer"} onClick={handleClick}>
        {isCompleted ? (
          <Flex
            w={{ base: "15px", md: "22px" }}
            h={{ base: "15px", md: "22px" }}
            borderRadius={"50%"}
            alignItems={"center"}
            justifyContent={"center"}
            background={
              "linear-gradient(90deg, hsl(192,100%,67%), hsl(280, 87%, 65%))"
            }
          >
            <Image src={checkIcon} />
          </Flex>
        ) : (
          <Circle
            width={{ base: "15px", md: "22px" }}
            height={{ base: "15px", md: "22px" }}
          />
        )}
      </Box>
      <Flex ml={"15px"} justifyContent={"space-between"} w={"100%"}>
        <Text
          fontWeight={"400"}
          fontSize={{ base: "14px", md: "22px" }}
          textDecoration={isCompleted ? "line-through" : "none"}
          color={
            colorMode === "light"
              ? isCompleted
                ? "gray.500"
                : "black"
              : "white"
          }
        >
          {todo.title}
        </Text>
        {isVisible && (
          <Box cursor={"pointer"} onClick={() => handleDeleteTodo(todo.id)}>
            <CloseButton />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

export default TodoItem;
