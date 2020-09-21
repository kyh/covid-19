import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`overflow-hidden rounded-sm border border-gray-700 py-4 px-6 ${className}`}
    >
      {children}
    </div>
  );
};
