import React, { useState, useEffect } from "react";
import Priority from "../Priority/Priority.jsx";
import { Category } from "../Category/index.jsx";
import { TASK_FILTERS } from "../../constants/index.js";
import {
  SidebarContainer,
  SidebarOverlay,
  SidebarSection,
  SidebarTitle,
  SidebarButton,
  SidebarButtonContent,
  SidebarBadge,
  SidebarDivider,
  SortCheckboxContainer,
  SortCheckboxLabel,
  SortDescription,
  ToggleButton,
  MenuIcon,
  MobileHeader,
  MobileHeaderBranding,
  MobileBrandIcon,
  MobileBrandText,
  MobileBrandTitle,
  MobileBrandSubtitle,
  MobileHeaderSpacer,
} from "./StyledSidebar.jsx";

const Sidebar = ({
  filter,
  priorityFilter,
  categoryFilter,
  categoryOptions,
  taskCounts,
  tasks,
  sortByPriority,
  onFilterChange,
  onPriorityFilterChange,
  onCategoryFilterChange,
  onSortToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // close sidebar after selection on mobile
  const handleButtonClick = (callback) => {
    callback();
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isMobile && (
        <>
          <MobileHeader>
            <ToggleButton
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle sidebar menu"
              $isOpen={isOpen}
            >
              <MenuIcon viewBox="0 0 24 24">
                {isOpen ? (
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                ) : (
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                )}
              </MenuIcon>
            </ToggleButton>
            <MobileHeaderBranding>
              <MobileBrandIcon />
              <MobileBrandText>
                <MobileBrandTitle>DayLily</MobileBrandTitle>
                <MobileBrandSubtitle>Today's Tasks</MobileBrandSubtitle>
              </MobileBrandText>
            </MobileHeaderBranding>
          </MobileHeader>
          <MobileHeaderSpacer />
        </>
      )}

      <SidebarOverlay $isOpen={isOpen} onClick={handleOverlayClick} />

      <SidebarContainer $isOpen={isOpen}>
        <SidebarSection>
          <SidebarTitle>Tasks</SidebarTitle>
          <SidebarButton
            $active={filter === TASK_FILTERS.ALL}
            onClick={() =>
              handleButtonClick(() => onFilterChange(TASK_FILTERS.ALL))
            }
          >
            <SidebarButtonContent>All Tasks</SidebarButtonContent>
            <SidebarBadge $active={filter === TASK_FILTERS.ALL}>
              {taskCounts.all}
            </SidebarBadge>
          </SidebarButton>
          <SidebarButton
            $active={filter === TASK_FILTERS.ACTIVE}
            onClick={() =>
              handleButtonClick(() => onFilterChange(TASK_FILTERS.ACTIVE))
            }
          >
            <SidebarButtonContent>Active</SidebarButtonContent>
            <SidebarBadge $active={filter === TASK_FILTERS.ACTIVE}>
              {taskCounts.active}
            </SidebarBadge>
          </SidebarButton>
          <SidebarButton
            $active={filter === TASK_FILTERS.COMPLETED}
            onClick={() =>
              handleButtonClick(() => onFilterChange(TASK_FILTERS.COMPLETED))
            }
          >
            <SidebarButtonContent>Completed</SidebarButtonContent>
            <SidebarBadge $active={filter === TASK_FILTERS.COMPLETED}>
              {taskCounts.completed}
            </SidebarBadge>
          </SidebarButton>
        </SidebarSection>

        <SidebarDivider />

        {/* priority filters section */}
        <SidebarSection>
          <SidebarTitle>Priority</SidebarTitle>
          <SidebarButton
            $active={priorityFilter === "all"}
            onClick={() =>
              handleButtonClick(() => onPriorityFilterChange("all"))
            }
          >
            <SidebarButtonContent>All</SidebarButtonContent>
            <SidebarBadge $active={priorityFilter === "all"}>
              {taskCounts.all}
            </SidebarBadge>
          </SidebarButton>
          <SidebarButton
            $active={priorityFilter === "high"}
            onClick={() =>
              handleButtonClick(() => onPriorityFilterChange("high"))
            }
            aria-label="Filter by high priority tasks"
          >
            <SidebarButtonContent>
              <Priority priority="high" size="small" variant="dot" />
              High
            </SidebarButtonContent>
            <SidebarBadge $active={priorityFilter === "high"}>
              {taskCounts.high}
            </SidebarBadge>
          </SidebarButton>
          <SidebarButton
            $active={priorityFilter === "medium"}
            onClick={() =>
              handleButtonClick(() => onPriorityFilterChange("medium"))
            }
            aria-label="Filter by medium priority tasks"
          >
            <SidebarButtonContent>
              <Priority priority="medium" size="small" variant="dot" />
              Medium
            </SidebarButtonContent>
            <SidebarBadge $active={priorityFilter === "medium"}>
              {taskCounts.medium}
            </SidebarBadge>
          </SidebarButton>
          <SidebarButton
            $active={priorityFilter === "low"}
            onClick={() =>
              handleButtonClick(() => onPriorityFilterChange("low"))
            }
            aria-label="Filter by low priority tasks"
          >
            <SidebarButtonContent>
              <Priority priority="low" size="small" variant="dot" />
              Low
            </SidebarButtonContent>
            <SidebarBadge $active={priorityFilter === "low"}>
              {taskCounts.low}
            </SidebarBadge>
          </SidebarButton>
        </SidebarSection>

        <SidebarDivider />

        {/* category filters section */}
        <SidebarSection>
          <SidebarTitle>Category</SidebarTitle>
          <SidebarButton
            $active={categoryFilter === "all"}
            onClick={() =>
              handleButtonClick(() => onCategoryFilterChange("all"))
            }
          >
            <SidebarButtonContent>All</SidebarButtonContent>
            <SidebarBadge $active={categoryFilter === "all"}>
              {taskCounts.all}
            </SidebarBadge>
          </SidebarButton>
          {categoryOptions.map((option) => {
            const count = tasks.filter(
              (t) => (t.category || "personal") === option.value
            ).length;
            return (
              <SidebarButton
                key={option.value}
                $active={categoryFilter === option.value}
                onClick={() =>
                  handleButtonClick(() => onCategoryFilterChange(option.value))
                }
                aria-label={`Filter by ${option.label} category tasks`}
              >
                <SidebarButtonContent>
                  <Category
                    category={option.value}
                    size="small"
                    variant="default"
                  />
                  {option.label}
                </SidebarButtonContent>
                <SidebarBadge $active={categoryFilter === option.value}>
                  {count}
                </SidebarBadge>
              </SidebarButton>
            );
          })}
        </SidebarSection>

        <SidebarDivider />

        {/* sort options section */}
        <SidebarSection>
          <SidebarTitle>Sort</SidebarTitle>
          <SortCheckboxContainer>
            <SortCheckboxLabel htmlFor="sort-priority">
              <input
                id="sort-priority"
                type="checkbox"
                checked={sortByPriority}
                onChange={(e) => onSortToggle(e.target.checked)}
                aria-describedby="sort-description"
              />
              By Priority
            </SortCheckboxLabel>
            <SortDescription id="sort-description">
              {sortByPriority ? "High → Medium → Low" : "Default order"}
            </SortDescription>
          </SortCheckboxContainer>
        </SidebarSection>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
