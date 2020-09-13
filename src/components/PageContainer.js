import React from "react";

export const PageContainer = ({ children }) => {
  return (
    <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-between">
      {children}
    </main>
  );
};
