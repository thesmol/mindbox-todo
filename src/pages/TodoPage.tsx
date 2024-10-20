import { Box } from "@mui/material";

import TodoForm from "../components/TodoForm";
import CarActivity from "../components/ui/CarActivity";

const TodoPage = () => {
  return (
    /** Основной контейнер страницы с тудушками */
    <Box className="w-full h-full flex flex-col items-center">
      {/** Контейнер с кошачьими активностями */}
      <CarActivity />

      <Box className="max-w-[95%] min-w-[95%] md:max-w-[70%] md:min-w-[70%] lg:max-w-[50%] lg:min-w-[50%] mx-10 h-full flex flex-col items-center">
        <h1 className="font-thin text-8xl text-accentHeader mb-4">todos</h1>
        {/** Форма работы с тудушками */}
        <TodoForm />
      </Box>
    </Box>
  );
};

export default TodoPage;
