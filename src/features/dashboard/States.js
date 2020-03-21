import React from 'react';

import { Input } from 'components/Input';
import { Card } from 'components/Card';
import { LineChart } from 'components/LineChart';

export const States = ({
  states,
  filtered,
  isLoading,
  selectedState,
  statesDailyData,
  onSelectState,
  onSearchState
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold leading-none">By State</h2>
        <Input
          label="search"
          placeholder="search"
          list="states"
          onChange={onSearchState}
        />
        <datalist id="states">
          {states.map(s => (
            <option key={s}>{s}</option>
          ))}
        </datalist>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {isLoading
          ? null
          : filtered.map(state => {
              const data = statesDailyData[state];
              return (
                <button
                  className="focus:outline-none focus:shadow-outline"
                  type="button"
                  key={state}
                  onClick={() => onSelectState(state)}
                >
                  <Card selected={selectedState === state}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold leading-none">
                        {state}
                      </h4>
                      <span className="text-sm text-red-500">
                        {data[data.length - 1].positive} cases
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
    </>
  );
};
