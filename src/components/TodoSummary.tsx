import { Box } from "@mui/material";
import { FilterQuery } from "../types.ts/todo";
import ActiveCount from "./ui/ActiveCount";
import Loader from "./ui/Loader";
import FilterGroup from "./FilterGroup";
import ActionButton from "./ui/ActionButton";

interface TodoSummaryProps {
  filter: FilterQuery;
  handleFilterChange: (filter: FilterQuery) => void;
  handleDelete: () => void;
  handleFetch?: () => Promise<void | undefined>;
  isDeleteLoading?: boolean;
  isFetchLoading?: boolean;
  activeTodosCount: number;
  isActiveCountLoading: boolean;
}

const TodoSummary = ({
  filter,
  handleFilterChange,
  handleDelete,
  handleFetch,
  isDeleteLoading,
  isFetchLoading,
  activeTodosCount,
  isActiveCountLoading,
}: TodoSummaryProps) => {
  return (
    <Box
      className="relative w-full p-4 flex justify-between items-center text-sm
    shadow-paper dark:shadow-paperDark text-todoInactive dark:text-todoInactiveDark"
    >
      {/** Количество активных тудушек */}
      {!isActiveCountLoading ? (
        <ActiveCount count={activeTodosCount} />
      ) : (
        <Loader size={20} />
      )}

      {/** Кнопки фильтрации */}
      <FilterGroup activeFilter={filter} setActiveFilter={handleFilterChange} />
      <Box className="flex gap-2">
        {/** Кнопка добавления тудушек с сервера*/}
        {handleFetch && (
          <ActionButton
            handleClick={handleFetch}
            isLoading={isFetchLoading ?? false}
            label={"Fetch"}
            extraClass={"w-[80px]"}
          />
        )}
        {/** Кнопка удаления завершенных тудушек */}
        <ActionButton
          handleClick={handleDelete}
          isLoading={isDeleteLoading ?? false}
          label={"Clear completed"}
        />
      </Box>
    </Box>
  );
};

export default TodoSummary;
