import React from 'react';

export const Card = ({ children }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-sm">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};
