import React from "react";
import {
  PrioritySelector as StyledSelector,
  PriorityOption,
} from "./StyledPriority.jsx";
import { PRIORITY_CONFIG } from "../../utils/priorityUtils.js";

const PrioritySelector = ({
  value,
  onChange,
  placeholder = "Priority",
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <StyledSelector
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      aria-label="Select task priority"
      {...props}
    >
      <PriorityOption value="high">{PRIORITY_CONFIG.high.label}</PriorityOption>
      <PriorityOption value="medium">
        {PRIORITY_CONFIG.medium.label}
      </PriorityOption>
      <PriorityOption value="low">{PRIORITY_CONFIG.low.label}</PriorityOption>
    </StyledSelector>
  );
};

export default PrioritySelector;
