import { PrioritySelector } from "../Priority/index.jsx";
import { CategorySelector } from "../Category/index.jsx";
import { EditSection, EditInputRow, EditInput } from "./StyledTaskItem.jsx";

const TaskEditor = ({
  editText,
  editPriority,
  editCategory,
  onTextChange,
  onPriorityChange,
  onCategoryChange,
  onKeyDown,
}) => {
  return (
    <EditSection>
      <EditInputRow>
        <EditInput
          value={editText}
          onChange={onTextChange}
          onKeyDown={onKeyDown}
          placeholder="Enter task..."
          autoFocus
        />
      </EditInputRow>
      <EditInputRow>
        <PrioritySelector value={editPriority} onChange={onPriorityChange} />
        <CategorySelector value={editCategory} onChange={onCategoryChange} />
      </EditInputRow>
    </EditSection>
  );
};

export default TaskEditor;
