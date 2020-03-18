import React from 'react';

import { useGetUSData } from 'hooks/useGetUSData';
import { useGetUSDailyData } from 'hooks/useGetUSDailyData';

import { Navigation } from 'components/Navigation';
import { PageHeader } from 'components/PageHeader';

import { Card } from 'components/Card';
import { CardStatTotal } from 'components/CardStatTotal';
import { CardStatGrowth } from 'components/CardStatGrowth';
import { CardStatGeneric } from 'components/CardStatGeneric';

import { LineChart } from 'components/LineChart';

const App = () => {
  const { isLoading: isLoadingTotal, data: usData } = useGetUSData();
  const { isLoading: isLoadingDaily, data: usDailyData } = useGetUSDailyData();

  console.log('current:', usData);
  console.log('daily:', usDailyData);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="py-10">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="flex px-4 pb-8 sm:px-0">
            <div className="w-1/3">
              <CardStatTotal data={usData} isLoading={isLoadingTotal} />
            </div>
            <div className="w-1/3">
              <CardStatGrowth data={usDailyData} isLoading={isLoadingDaily} />
            </div>
            <div className="w-1/3">
              <CardStatGeneric
                title="Deceased"
                number={usData.death}
                isLoading={isLoadingTotal}
              />
            </div>
          </div>
          <Card>
            <LineChart data={usDailyData} />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default App;
