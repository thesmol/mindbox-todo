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
      className="relative w-full p-4 text-sm 
    text-todoInactive dark:text-todoInactiveDark flex flex-wrap gap-4"
    >
      {/* Количество активных тудушек */}
      <div className="flex-shrink-0 flex items-center">
        {!isActiveCountLoading ? (
          <ActiveCount count={activeTodosCount} />
        ) : (
          <Loader size={20} />
        )}
      </div>

      {/* Группа фильтров - будет переноситься в центр при необходимости */}
      <div className="flex-grow basis-full md:basis-auto order-3 md:order-none flex justify-center">
        <FilterGroup
          activeFilter={filter}
          setActiveFilter={handleFilterChange}
        />
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-2 ml-auto flex-shrink-0">
        {handleFetch && (
          <ActionButton
            handleClick={handleFetch}
            isLoading={isFetchLoading ?? false}
            label={"Fetch"}
            extraClass={"w-[80px]"}
          />
        )}
        <ActionButton
          handleClick={handleDelete}
          isLoading={isDeleteLoading ?? false}
          label={"Clear completed"}
        />
      </div>
    </Box>
  );
};

export default TodoSummary;
