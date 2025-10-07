import {
  PriorityContainer,
  PriorityBadge,
  PriorityIcon,
  PriorityText,
} from "./StyledPriority.jsx";
import { getPriorityConfig } from "../../utils/priorityUtils.js";

const Priority = ({
  priority,
  size = "medium",
  showLabel = false,
  variant = "minimal",
}) => {
  const config = getPriorityConfig(priority);

  if (variant === "dot") {
    return (
      <PriorityContainer>
        <PriorityBadge
          $color={config.color}
          $backgroundColor={config.color}
          $borderColor={config.color}
          $textColor="transparent"
          $size={size}
          $variant="dot"
          role="img"
          aria-label={config.ariaLabel}
          title={`${config.label} priority`}
        />
      </PriorityContainer>
    );
  }

  if (variant === "minimal") {
    return (
      <PriorityContainer>
        <PriorityBadge
          $color={config.textColor}
          $backgroundColor="transparent"
          $borderColor={config.color}
          $textColor={config.textColor}
          $size={size}
          $variant="minimal"
          role="img"
          aria-label={config.ariaLabel}
          title={`${config.label} priority`}
        >
          <PriorityText $size={size}>
            {showLabel ? config.label : config.shortLabel}
          </PriorityText>
        </PriorityBadge>
      </PriorityContainer>
    );
  }

  return (
    <PriorityContainer>
      <PriorityBadge
        $color={config.textColor}
        $backgroundColor={config.backgroundColor + "40"}
        $borderColor={config.color + "60"}
        $textColor={config.textColor}
        $size={size}
        $variant="badge"
        role="img"
        aria-label={config.ariaLabel}
        title={`${config.label} priority`}
      >
        <PriorityText $size={size}>
          {showLabel ? config.label : config.shortLabel}
        </PriorityText>
      </PriorityBadge>
    </PriorityContainer>
  );
};

export default Priority;
