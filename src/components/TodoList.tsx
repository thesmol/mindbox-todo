import { Box } from "@mui/material";
import { Todo } from "../types.ts/todo";
import TodoItem from "./TodoItem";
import TodoSummary from "./TodoSummary";
import { useMemo } from "react";

interface TodoListProps {
  todos: Todo[];
  handleTodoChange: () => void;
}

const TodoList = ({ todos, handleTodoChange }: TodoListProps) => {
  const leftTodo = useMemo(() => {
    todos.reduce((acc, todo) => (todo.completed ? acc : acc + 1), 0);
  }, [todos]);

  return (
    <Box className="divide-y divide-slate-200 flex flex-col w-full bg-white shadow-xl">
      {todos.map((todo) => (
        <TodoItem todo={todo} handleChange={handleTodoChange} key={todo.id} />
      ))}
      <TodoSummary />
    </Box>
  );
};

export default TodoList;
