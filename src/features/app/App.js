import React from 'react';
import useFetch from 'react-fetch-hook';
import { Navigation } from 'components/Navigation';
import { PageHeader } from 'components/PageHeader';
import { Card } from 'components/Card';
import { CardStat } from 'components/CardStat';
import { LineChart } from 'components/LineChart';

const App = () => {
  const { isLoading: isLoadingUS, data: usData } = useFetch(
    'https://covidtracking.com/api/us'
  );

  const currentData = usData ? usData[0] : {};
  console.log(currentData);
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="py-10">
        <PageHeader>United States</PageHeader>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex px-4 py-8 sm:px-0">
              <div className="w-1/4">
                <CardStat
                  title="Total Cases"
                  number={currentData.total}
                  isLoading={isLoadingUS}
                />
              </div>
              <div className="w-1/4">
                <CardStat
                  title="Tested Positive"
                  number={currentData.positive}
                  isLoading={isLoadingUS}
                />
              </div>
              <div className="w-1/4">
                <CardStat
                  title="Growth Rate"
                  number={currentData.total}
                  isLoading={isLoadingUS}
                />
              </div>
              <div className="w-1/4">
                <CardStat
                  title="Deceased"
                  number={currentData.death}
                  isLoading={isLoadingUS}
                />
              </div>
            </div>
            <Card>
              <LineChart />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
