import React, { useState } from 'react';

import { useGetUSDailyData } from 'hooks/useGetUSDailyData';
import { useGetStatesDailyData } from 'hooks/useGetStatesDailyData';

import { Navigation } from 'components/Navigation';
import { Input } from 'components/Input';
import { Card } from 'components/Card';
import { StatTotal } from 'components/StatTotal';
import { StatGrowth } from 'components/StatGrowth';
import { LineChart } from 'components/LineChart';

const App = () => {
  const { isLoading: isLoadingDaily, data: usDailyData } = useGetUSDailyData();
  const {
    isLoading: isLoadingStates,
    data: statesDailyData,
    states
  } = useGetStatesDailyData();

  const [selectedState, setSelectedState] = useState(null);

  const selectState = state => {
    if (selectedState === state) {
      setSelectedState(null);
    } else {
      setSelectedState(state);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="py-8">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className="flex px-4 pb-8 sm:px-0">
            <div className="w-3/4 pr-10">
              <div className="mb-2">
                <StatTotal
                  data={statesDailyData[selectedState] || usDailyData}
                  isLoading={isLoadingDaily}
                  selectedState={selectedState}
                />
              </div>
              <LineChart data={statesDailyData[selectedState] || usDailyData} />
            </div>
            <div className="w-1/4">
              <Card>
                <StatGrowth
                  data={statesDailyData[selectedState] || usDailyData}
                  isLoading={isLoadingDaily}
                />
              </Card>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold leading-none">
              By State
            </h2>
            <Input label="search" placeholder="search" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {isLoadingStates
              ? null
              : states.map(state => {
                  const data = statesDailyData[state];
                  return (
                    <button
                      type="button"
                      key={state}
                      onClick={() => selectState(state)}
                    >
                      <Card selected={selectedState === state}>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-lg font-semibold leading-none">
                            {state}
                          </h4>
                          <span className="text-sm text-red-500">
                            {data[0].positive} cases
                          </span>
                        </div>
                        <LineChart
                          data={data}
                          options={{
                            height: 100,
                            yAxis: false,
                            margin: {
                              top: 0,
                              bottom: 20,
                              left: 0,
                              right: 0
                            }
                          }}
                        />
                      </Card>
                    </button>
                  );
                })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
