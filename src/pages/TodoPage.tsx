import { Box } from "@mui/material";

import TodoForm from "../components/TodoForm";
import CarActivity from "../components/ui/CarActivity";

const TodoPage = () => {
  return (
    /** Основной контейнер страницы с тудушками */
    <Box className="w-full h-full flex flex-col items-center">
      {/** Контейнер с кошачьими активностями */}
      <CarActivity />

      <Box className="max-w-[90vw] min-w-[90vw] md:max-w-[50vw] md:min-w-[50vw] mx-10 h-full flex flex-col items-center">
        <h1 className="font-thin text-8xl text-accentHeader mb-4">todos</h1>
        {/** Форма работы с тудушками */}
        <TodoForm />
        {/** Кнопка добавления данных с JSONPlaceholder */}
        {/* <Box className="w-full flex justify-end mt-5">
          <button
            className="px-2 py-1 text-sm rounded-md transition-colors duration-200 w-[120px] flex justify-center
            dark:bg-bgDark dark:hover:bg-accentHeader bg-bg hover:bg-accentHeader"
            onClick={() => handleManualFetch(limit, batch)}
            disabled={isTodosLoading}
          >
            {isTodosLoading ? (
              <Loader size={20} />
            ) : (
              <span
                className="flex items-center justify-center gap-2
              text-divider dark:text-dividerDark"
              >
                <FiPlusSquare />
                add data
              </span>
            )}
          </button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default TodoPage;
