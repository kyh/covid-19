import React from 'react';

export const Card = ({ children, selected }) => {
  return (
    <div
      className={`${
        selected ? 'bg-gray-200' : 'bg-white'
      } overflow-hidden shadow rounded-sm transition duration-300 ease-in-out`}
    >
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};
