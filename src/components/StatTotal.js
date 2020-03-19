import React from 'react';
import { numberWithCommas } from 'utils/formatter';

export const StatTotal = ({ data = {}, isLoading = false }) => {
  return (
    <div>
      <div className="text-xs uppercase text-gray-600 mb-1 font-semibold">
        Total Cases
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold leading-none text-red-500">
          {numberWithCommas(data.positive)}
        </h1>
        <div className="text-right">
          <p className="text-sm">
            {numberWithCommas(data.total)}{' '}
            <span className="text-gray-600">Tests Conducted</span>
          </p>
          <p className="text-sm">
            {numberWithCommas(data.negative)}{' '}
            <span className="text-blue-600"> Tested Negative</span>
          </p>
        </div>
      </div>
    </div>
  );
};
