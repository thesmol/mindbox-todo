import { Box } from "@mui/material";
import { Todo } from "../types.ts/todo";
import TodoList from "../components/TodoList";
import CarActivity from "../components/ui/CarActivity";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import TodoService from "../api/TodoService";
import { getBatchCount } from "../utils/getBatchCount";
import { useObserver } from "../hooks/useObserver";

const TodoPage = () => {
  /** Список тудушек */
  const [todos, setTodos] = useState<Todo[]>([]);
  /** Текущий набор загруженных тудушек (по умолчанию 1) */
  const [batch, setBatch] = useState<number>(1);
  /** Общее количество наборов загруженных данных */
  const [totalBatches, setTotalBatches] = useState(0);
  /** реф на последний видимый элемент, который триггерит подгрузку новых элементов */
  const lastElement = useRef<HTMLDivElement | null>(null);

  /** Лимит загрузки тудушек (по умолчанию 10) */
  const limit = 10;

  /** Мемоизируем fetchTodos с использованием useCallback */
  const [fetchTodos, isTodosLoading, todoError] = useFetching(
    useCallback(async (limit: number, page: number) => {
      const response = await TodoService.getAll(limit, page);
      setTodos((prevTodos) => [...prevTodos, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalBatches(getBatchCount(totalCount, limit));
    }, [])
  );

  useObserver(lastElement, batch < totalBatches, isTodosLoading, () => {
    setBatch(batch + 1);
  });

  useEffect(() => {
    fetchTodos(limit, batch);
  }, [batch]);

  if (todoError) {
    return (
      <Box>
        <h1>Что-то пошло не так</h1>
        <p>{todoError}</p>
      </Box>
    );
  }

  const handleChange = () => {};

  return (
    /** Основной контейнер страницы с тудушками */
    <Box className="w-full h-full flex flex-col items-center bg-[#F5F5F5]">
      {/** Контейнер с кошачьими активностями */}
      <CarActivity />

      <Box className="w-2/5 h-full flex flex-col items-center">
        <h1 className="font-thin text-8xl text-[#E9D9D8] mb-4">todos</h1>
        {/** Список тудушек */}
        <TodoList todos={todos} handleTodoChange={handleChange} />

        {/** Последний видимый элемент, который триггерит подгрузку новых элементов */}
        <div className="h-[5px] opacity-0" ref={lastElement} />
      </Box>
    </Box>
  );
};

export default TodoPage;
