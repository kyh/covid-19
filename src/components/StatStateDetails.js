import React from 'react';

export const StatStateDetails = ({ stateInfo }) => {
  return (
    <div>
      <div className="text-xs uppercase text-gray-600 mb-1 font-semibold">
        Details
      </div>
      <div>
        <a
          className="text-gray-500 hover:text-gray-700"
          href={stateInfo.covid19Site}
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      </div>
    </div>
  );
};
