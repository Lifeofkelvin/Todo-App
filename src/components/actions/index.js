import axios from "axios";

const apiURL = "http://localhost:3001";

export const fetchTodos = async () => {
  const { data } = await axios.get(`${apiURL}/todos`);
  return data.sort((a, b) => b.id - a.id);
};

export const addTodo = async (todo) => {
  await axios.post(`${apiURL}/todos`, todo);
};

export const getTodo = async (id) => {
  const { data } = await axios.get(`${apiURL}/todos/${id}`);
  return data;
};

export const markTodoCompleted = async (id) => {
  const todo = await getTodo(id);
  const updatedTodo = { ...todo, isCompleted: true };

  await axios.patch(`${apiURL}/todos/${id}`, updatedTodo);
  localStorage.setItem("todos", JSON.stringify(updatedTodo));
};

export const deleteTodo = async (id) => {
  await axios.delete(`${apiURL}/todos/${id}`);
  return await fetchTodos();
};

export const countUncompletedTodo = async () => {
  const todos = await fetchTodos();
  return todos.filter((todo) => !todo.isCompleted).length;
};

export const isTodoCompleted = async (id) => {
  try {
    const response = await axios.get(`/api/todos/${id}`);
    return response.data.isCompleted;
  } catch (error) {
    console.error(error);
  }
};

export const clearAllCompletedTodos = async () => {
  const todos = await fetchTodos();

  const incompleteTodos = todos.filter((todo) => !todo.isCompleted);

  await Promise.all(
    todos
      .filter((todo) => todo.isCompleted)
      .map((todo) => axios.delete(`${apiURL}/todos/${todo.id}`))
  );

  return incompleteTodos;
};

export const getAllTodos = async () => {
  await fetchTodos(); 
  const todos = await fetchTodos();
  return todos;
};

export const getActiveTodos = async () => {
  const todos = await fetchTodos();
  return todos.filter((todo) => !todo.isCompleted);
};

export const getCompletedTodos = async () => {
  const todos = await fetchTodos();
  return todos.filter((todo) => todo.isCompleted);
};
