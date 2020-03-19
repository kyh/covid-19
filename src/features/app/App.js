import React from 'react';

import { useGetUSData } from 'hooks/useGetUSData';
import { useGetUSDailyData } from 'hooks/useGetUSDailyData';

import { Navigation } from 'components/Navigation';

import { Card } from 'components/Card';
import { StatTotal } from 'components/StatTotal';
import { StatGrowth } from 'components/StatGrowth';

import { LineChart } from 'components/LineChart';

const App = () => {
  const { isLoading: isLoadingTotal, data: usData } = useGetUSData();
  const { isLoading: isLoadingDaily, data: usDailyData } = useGetUSDailyData();

  console.log('current:', usData);
  console.log('daily:', usDailyData);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="py-8">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className="flex px-4 pb-8 sm:px-0">
            <div className="w-3/4 pr-10">
              <div className="mb-2">
                <StatTotal data={usData} isLoading={isLoadingTotal} />
              </div>
              <LineChart data={usDailyData} />
            </div>
            <div className="w-1/4">
              <Card>
                <StatGrowth data={usDailyData} isLoading={isLoadingDaily} />
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
