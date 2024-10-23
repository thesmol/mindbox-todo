import React from "react";
import { Box } from "@mui/material";

import TodoForm from "../components/TodoForm";
import CarActivity from "../components/ui/CarActivity";

const TodoPage: React.FC = () => {
  return (
    /** Основной контейнер страницы с тудушками */
    <Box className="w-full min-h-[100vh] flex flex-col items-center">
      {/** Контейнер с кошачьими активностями */}
      <CarActivity />

      <Box className="max-w-full min-w-full md:max-w-[70%] md:min-w-[70%] lg:max-w-[50%] lg:min-w-[50%] mx-10 flex flex-col items-center overflow-y-auto p-[20px]">
        <h1 className="w-full font-thin sm:text-8xl sm:mb-4 sm:mt-0 sm:text-center text-right text-accentHeader mt-8 mb-2 text-4xl">
          todos
        </h1>
        {/** Форма работы с тудушками */}
        <TodoForm />
      </Box>
    </Box>
  );
};

export default TodoPage;
