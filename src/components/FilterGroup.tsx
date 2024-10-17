import React from "react";
import { FilterQuery } from "../types.ts/todo";

interface FilterButtonsProps {
  activeFilter: FilterQuery;
  setActiveFilter: (filter: FilterQuery) => void;
}

/**
 * Компонент, отображающий кнопки для фильтрации списка тудушек
 *
 * @param FilterButtonsProps - состояние и функция, обновляющая состояние
 */

const FilterGroup: React.FC<FilterButtonsProps> = ({
  activeFilter,
  setActiveFilter,
}) => {
  const buttonClass = "px-2 py-1 rounded-md transition-colors duration-200";
  const activeButtonClass = `${buttonClass} border border-accentHeader`;
  const inactiveButtonClass = `${buttonClass} hover:bg-bg`;

  const filterLabels: Record<FilterQuery, string> = {
    [FilterQuery.ALL]: "All",
    [FilterQuery.DONE]: "Done",
    [FilterQuery.ACTIVE]: "Active",
  };

  return (
    <div className="flex space-x-2">
      {Object.values(FilterQuery).map((filter) => (
        <button
          key={filter}
          className={
            filter === activeFilter ? activeButtonClass : inactiveButtonClass
          }
          onClick={() => setActiveFilter(filter)}
        >
          {filterLabels[filter]}
        </button>
      ))}
    </div>
  );
};

export default FilterGroup;
