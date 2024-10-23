import React from "react";
import { Box } from "@mui/material";
import CollapseButton from "./ui/CollapseButton";
import { useState } from "react";

interface TodoInputProps {
  isTodosOpen: boolean;
  setIsTodosOpen: (isOpen: boolean) => void;
  setNewTodo: (todo: string) => void;
}

const TodoInput = ({
  isTodosOpen,
  setIsTodosOpen,
  setNewTodo,
}: TodoInputProps) => {
  const [inputValue, setInputValue] = useState("");

  // Используем React.KeyboardEvent для типизации события
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setNewTodo(inputValue);
      setInputValue(""); // Очищаем инпут после создания
    }
  };

  return (
    <Box className="flex items-center gap-4 w-full p-2">
      <CollapseButton
        isOpen={isTodosOpen}
        onClick={() => setIsTodosOpen(!isTodosOpen)}
      />
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className="flex-1 min-w-0 pr-3 py-2 overflow-hidden whitespace-nowrap overflow-ellipsis
        italic text-2xl text-todoActive dark:text-todoActiveDark placeholder:text-todoInactive dark:placeholder:text-todoInactiveDark
        bg-transparent outline-none "
      />
    </Box>
  );
};

export default TodoInput;
