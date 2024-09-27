import { Box, useColorMode, Text, Center } from "@chakra-ui/react";
import lightBackgroundImage from "/assets/images/bg-desktop-light.jpg";
import darkBackgroundImage from "/assets/images/bg-desktop-dark.jpg";
import Header from "./components/Header";
import InputButton from "./components/InputButton";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import {
  fetchTodos,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  countUncompletedTodo,
  clearAllCompletedTodos,
  getActiveTodos,
  getCompletedTodos,
  getAllTodos,
} from "./components/actions/index";
import TodoList from "./components/TodoList";
import StatusBar from "./components/StatusBar";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [itemLeft, setItemLeft] = useState(0);

  const handleAddTodo = (e) => {
    if (todo && e.keyCode === 13) {
      const newTodo = {
        id: uuidv4(),
        title: todo,
        isCompleted: false,
      };

      setTodos([newTodo, ...todos]);
      addTodo(newTodo);
      setTodo("");
    }
  };

  const handleClearAllClick = async () => {
    await clearAllCompletedTodos();
    fetchTodos().then((data) => setTodos(data));
  };

  const handleAllClick = async () => {
    const todos = await getAllTodos();
    setTodos(todos);
    setItemLeft(todos.filter((todo) => !todo.isCompleted).length);
  };

  const handleActiveClick = async () => {
    getActiveTodos().then((todos) => setTodos(todos));
  };

  const handleCompletedClick = async () => {
    getCompletedTodos().then((todos) => setTodos(todos));
  };

  const handleCompletedTodo = async (id) => {
    await markTodoCompleted(id);
    const updatedTodos = await fetchTodos();
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    const updatedTodos = await fetchTodos();
    setTodos(updatedTodos);
  };

  useEffect(() => {
    fetchTodos().then((data) => setTodos(data));
  }, []);

  useEffect(() => {
    countUncompletedTodo().then((count) => setItemLeft(count));
  });

  return (
    <Box
      backgroundImage={
        colorMode === "light" ? lightBackgroundImage : darkBackgroundImage
      }
      backgroundSize={"cover"}
      h={{ base: "30vh", md: "40vh" }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        w={{ base: "90%", md: "40%" }}
        p={"2em 0"}
        m={"auto"}
        position={"relative"}
      >
        <Header colorMode={colorMode} toggleColorMode={toggleColorMode} />
        <InputButton
          colorMode={colorMode}
          todo={todo}
          setTodo={setTodo}
          addTodo={handleAddTodo}
        />
        <Box
          w={"100%"}
          m={"auto"}
          p={"2"}
          background={colorMode === "light" ? "#f3fcec" : "#242e41"}
          borderRadius={"10px 10px 0px 0px"}
          scrollBehavior={"smooth"}
          maxH={{ base: "50vh", md: "60vh" }}
          overflowY={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "8px",
              borderRadius: "10px",
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: "10px",
              border: "2px solid transparent",
              backgroundClip: "padding-box",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#aaa",
            },
            "&::-webkit-scrollbar-track": {
              borderRadius: "8px",
              backgroundColor: "transparent",
            },
          }}
        >
          <Box w={"100%"} textAlign={"center"} fontSize={"xl"}>
      
              {todos.length === 0 ? (
                <Text opacity={0.5}>ADD TASK</Text>
              ) : (
                <TodoList
                  todos={todos}
                  colorMode={colorMode}
                  handleCompletedTodo={handleCompletedTodo}
                  handleDeleteTodo={handleDeleteTodo}
                />
              )}
          
          </Box>
        </Box>
        <StatusBar
          colorMode={colorMode}
          itemLeft={itemLeft}
          handleClearAllClick={handleClearAllClick}
          handleAllClick={handleAllClick}
          handleCompletedClick={handleCompletedClick}
          handleActiveClick={handleActiveClick}
        />
      </Box>
    </Box>
  );
}

export default App;
