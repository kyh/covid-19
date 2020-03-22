import React from 'react';
import { growthRate } from 'utils/stats';
import { Icon } from 'components/Icon';

export const StatMortality = ({ data = [], isLoading = false }) => {
  const today = data[data.length - 1] || {};
  const yesterday = data[data.length - 2] || {};

  const todayMortality = (today.death / today.positive) * 100;
  const yesterdayMortality = (yesterday.death / yesterday.positive) * 100;
  const difference = growthRate(yesterdayMortality, todayMortality);
  const positive = difference > 0;

  return (
    <div>
      <div className="text-xs uppercase text-gray-600 mb-1 font-semibold">
        Mortality Rate
      </div>
      {!isLoading ? (
        <div className="mb-3">
          <h2 className="text-2xl leading-none">
            {todayMortality.toFixed(2)}
            <span className="text-gray-600 text-xs">%</span>
          </h2>
          <div className="flex items-center text-xs">
            <div className="mr-1">
              <Icon
                size="sm"
                icon={positive ? 'trendUp' : 'trendDown'}
                color={positive ? 'text-red-500' : 'text-green-500'}
              />
            </div>
            <span className={positive ? 'text-red-500' : 'text-green-500'}>
              ({positive ? 'up' : 'down'} from {yesterdayMortality.toFixed(2)}%)
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
