import React from "react";

export const Card = ({ children }) => {
  return (
    <div className="overflow-hidden rounded-sm border border-gray-700 px-4 py-5 sm:p-6">
      {children}
    </div>
  );
};
