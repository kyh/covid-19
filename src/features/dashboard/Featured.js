import React from 'react';

import { Card } from 'components/Card';
import { StatTotal } from 'components/StatTotal';
import { StatGrowth } from 'components/StatGrowth';
import { StatMortality } from 'components/StatMortality';
import { StatStateDetails } from 'components/StatStateDetails';
import { LineChart } from 'components/LineChart';

export const Featured = ({
  dailyData,
  statesInfo,
  selectedState,
  isLoading
}) => {
  return (
    <div className="flex px-4 pb-8 sm:px-0">
      <div className="w-3/4 pr-10">
        <div className="mb-2">
          <StatTotal
            data={dailyData}
            selectedState={selectedState}
            isLoading={isLoading}
          />
        </div>
        <LineChart data={dailyData} />
      </div>
      <div className="w-1/4">
        <Card>
          <div className="mb-5">
            <StatGrowth data={dailyData} isLoading={isLoading} />
          </div>
          <div className="mb-5">
            <StatMortality data={dailyData} isLoading={isLoading} />
          </div>
          {selectedState && statesInfo[selectedState] && (
            <StatStateDetails stateInfo={statesInfo[selectedState]} />
          )}
        </Card>
      </div>
    </div>
  );
};
