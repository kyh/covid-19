import React from 'react';
import { numberWithCommas } from 'utils/formatter';

export const StatTotal = ({
  data = [],
  selectedState = 'US',
  isLoading = false
}) => {
  const today = data[data.length - 1];
  return (
    <div>
      <div className="text-xs uppercase text-gray-600 mb-1 font-semibold">
        {selectedState || 'US'} Total Cases
      </div>
      {!isLoading ? (
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold leading-none text-red-500">
            {numberWithCommas(today.positive)}
          </h1>
          <div className="text-right">
            <p className="text-sm">
              {numberWithCommas(today.total)}{' '}
              <span className="text-gray-600">Tests Conducted</span>
            </p>
            <p className="text-sm">
              {numberWithCommas(today.negative)}{' '}
              <span className="text-blue-600"> Tested Negative</span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
