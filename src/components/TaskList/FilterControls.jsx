import React from "react";
import { FilterContainer, FilterButton } from "./StyledTaskList.jsx";
import { TASK_FILTERS } from "../../constants/index.js";

const FilterControls = ({
  filter,
  taskCounts,
  showAdvancedFilters,
  onFilterChange,
  onAdvancedFiltersToggle,
}) => {
  return (
    <FilterContainer>
      <FilterButton
        $active={filter === TASK_FILTERS.ALL}
        onClick={() => onFilterChange(TASK_FILTERS.ALL)}
      >
        All ({taskCounts.all})
      </FilterButton>
      <FilterButton
        $active={filter === TASK_FILTERS.ACTIVE}
        onClick={() => onFilterChange(TASK_FILTERS.ACTIVE)}
      >
        Active ({taskCounts.active})
      </FilterButton>
      <FilterButton
        $active={filter === TASK_FILTERS.COMPLETED}
        onClick={() => onFilterChange(TASK_FILTERS.COMPLETED)}
      >
        Completed ({taskCounts.completed})
      </FilterButton>

      <FilterButton
        $active={showAdvancedFilters}
        onClick={onAdvancedFiltersToggle}
        style={{ marginLeft: "auto" }}
        aria-expanded={showAdvancedFilters}
        aria-label="Toggle advanced filters"
      >
        {showAdvancedFilters ? "Less" : "More"}
      </FilterButton>
    </FilterContainer>
  );
};

export default FilterControls;
