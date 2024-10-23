import React from "react";
import { Box } from "@mui/material";
import { Todo } from "../types.ts/todo";
import TodoItem from "./TodoItem";
import Loader from "./ui/Loader";

interface TodoListProps {
  todos: Todo[];
  handleTodoChange: (todo: Todo) => void;
  lastElementRef?: React.RefObject<HTMLDivElement>;
  loading: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleTodoChange,
  lastElementRef,
  loading,
}: TodoListProps) => {
  return (
    <Box className="w-full flex flex-col h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded">
      <Box className="divide-y divide-divider dark:divide-dividerDark">
        {todos.map((todo, index) => (
          <TodoItem
            todo={todo}
            handleChange={handleTodoChange}
            key={`${todo.id}-${index}`}
          />
        ))}
        {/** Наблюдаемый элемент, вызывающий подгрузку новой партии данных */}
        <div ref={lastElementRef} className="h-0 opacity-0" />
      </Box>
      {loading && (
        <Box className="w-full h-[60px] flex justify-center items-center text-todoInactive dark:text-todoInactiveDark">
          <Loader size={30} />
        </Box>
      )}
    </Box>
  );
};

export default TodoList;
