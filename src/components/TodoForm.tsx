import { Box } from "@mui/material";
import TodoList from "./TodoList";
import TodoSummary from "./TodoSummary";
import { useEffect, useRef, useState } from "react";
import { FilterQuery, Todo } from "../types.ts/todo";
import { useFilteredTodos } from "../hooks/useFilteredTodos";
import TodoFakeService from "../api/TodoFakeService";
import { useQuery } from "../hooks/useQuery";
import TodoLocalService from "../api/TodoLocalService";
import CollapsePortal from "./ui/CollapsePortal";
import TodoInput from "./TodoInput";

/** Форма работы с тудушками */
const TodoForm = () => {
  /** Список тудушек */
  const [todos, setTodos] = useState<Todo[]>([]);
  /** Состояние фильтрации */
  const [filter, setFilter] = useState<FilterQuery>(FilterQuery.ALL);
  /** Состояние открытия списка тудушек */
  const [isTodosOpen, setIsTodosOpen] = useState<boolean>(true);
  /** Количество незавершенных тудушек */
  const [activeTodosCount, setActiveTodosCount] = useState<number>(0);

  /** реф на последний видимый элемент, который триггерит подгрузку новых элементов */
  const lastElement = useRef<HTMLDivElement | null>(null);

  /** Фильтруем список тудушек по умолчанию */
  const filteredTodos = useFilteredTodos(todos, filter);

  /** Лимит загрузки тудушек (по умолчанию 20) */
  const limit = 20;

  /** Функция для подгрузки тудушек с сервера, статус загрузки и ошибки */
  const [fetchTodos, isFetchTodosLoading] = useQuery(
    async (limit?: number, page?: number) => {
      // получаем данные с сервера
      const response = await TodoFakeService.getBatch(limit, page);
      // добавляем полученные данные в локальное хранилище
      const updatedTodos = TodoLocalService.createByEntities(response.data);

      // обновляем состояния: список туду
      setTodos(updatedTodos);
    }
  );

  /** Функция для получения тудушек из хранилища */
  const getTodos = () => {
    const allTodos = TodoLocalService.getAll();
    setTodos(allTodos);
  };

  /** Получаем функцию для удаления выполненных тудушек */
  const deleteDoneTodos = () => {
    // Получаем ID завершенных задач из хранилища
    const doneIds = TodoLocalService.getDoneTodos();

    const activeTodos = TodoLocalService.delete(doneIds);

    // Обновляем список тудушек
    setTodos(activeTodos);
  };

  /** Функция обновления тудушки */
  const updateTodo = (todo: Todo) => {
    TodoLocalService.update(todo);
    // Получаем актуальный список после обновления
    const updatedTodos = TodoLocalService.getAll();
    setTodos(updatedTodos);
  };

  const createTodo = (title: string) => {
    const newTodos = TodoLocalService.createByTitles([title]);
    setTodos(newTodos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    setActiveTodosCount(TodoLocalService.getActiveCount());
  }, [todos]);

  return (
    <Box
      className="divide-y w-full mb-4
    divide-divider dark:divide-dividerDark bg-bgTodo dark:bg-bgTodoDark shadow-paper dark:shadow-paperDark"
    >
      <TodoInput
        isTodosOpen={isTodosOpen}
        setIsTodosOpen={setIsTodosOpen}
        setNewTodo={createTodo}
      />
      <CollapsePortal isOpen={isTodosOpen} className="w-full">
        {/** Список тудушек */}
        <TodoList
          todos={filteredTodos}
          handleTodoChange={updateTodo}
          lastElementRef={lastElement}
          loading={isFetchTodosLoading}
        />
      </CollapsePortal>
      {/** Футер с элементами управления снизу списка тудушек */}
      <TodoSummary
        filter={filter}
        handleFilterChange={setFilter}
        handleDelete={deleteDoneTodos}
        handleFetch={() => fetchTodos(limit)}
        isFetchLoading={isFetchTodosLoading}
        activeTodosCount={activeTodosCount}
        isActiveCountLoading={false}
      />
    </Box>
  );
};

export default TodoForm;
