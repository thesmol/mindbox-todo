import { useMemo } from "react";
import { FilterQuery, Todo } from "../types.ts/todo";

/**
 * Hook, который фильтрует массив Todo в зависимости от filter.
 *
 * @param todos - массив Todo, который нужно отфильтровать
 * @param filter - тип фильтра, который нужно использовать
 *
 * @returns отфильтрованный массив Todo
 */
export const useFilteredTodos = (
  todos: Todo[],
  filter: FilterQuery
): Todo[] => {
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FilterQuery.DONE:
        return todos.filter((todo) => todo.completed);
      case FilterQuery.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case FilterQuery.ALL:
      default:
        return todos;
    }
  }, [todos, filter]);

  return filteredTodos;
};
