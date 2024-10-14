import { Box } from "@mui/material";
import { Todo } from "../types.ts/todo";
import TodoList from "../components/TodoList";
import CarActivity from "../components/ui/CarActivity";
const todos: Todo[] = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
  {
    userId: 1,
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    completed: false,
  },
];
const TodoPage = () => {
  const handleChange = () => {};

  return (
    <Box className="w-full h-full flex flex-col items-center bg-[#F5F5F5]">
      <CarActivity />
      <Box className="w-2/5 h-full flex flex-col items-center">
        <h1 className="font-thin text-8xl text-[#E9D9D8] mb-4">todos</h1>
        <TodoList todos={todos} handleTodoChange={handleChange} />
      </Box>
    </Box>
  );
};

export default TodoPage;
