import React from "react";

const SaveErrorNotification = ({ saveError }) => {
  if (!saveError) return null;

  return (
    <div
      style={{
        padding: "8px 12px",
        marginBottom: "16px",
        backgroundColor: "#fef2f2",
        border: "1px solid #fecaca",
        borderRadius: "6px",
        color: "#dc2626",
        fontSize: "14px",
      }}
      role="alert"
      aria-live="polite"
    >
      ⚠️ {saveError}
    </div>
  );
};

export default SaveErrorNotification;
