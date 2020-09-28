import React from "react";
import ContentLoader from "react-content-loader";

import { Input } from "components/Input";
import { Card } from "components/Card";
import { LineChart } from "components/LineChart";

export const States = ({
  states,
  filtered,
  isLoading,
  selectedState,
  statesDailyData,
  onSelectState,
  onSearchState,
}) => {
  return (
    <div className="px-4 sm:px-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold leading-none">By State</h2>
        <Input
          label="search"
          placeholder="search"
          list="states"
          onChange={onSearchState}
        />
        <datalist id="states">
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </datalist>
      </div>
      {isLoading ? (
        <ContentLoader style={{ width: "100%", height: 180 }}>
          <rect x="0" y="0" rx="4" ry="4" width="30%" height="100%" />
          <rect x="33%" y="0" rx="4" ry="4" width="30%" height="100%" />
          <rect x="66%" y="0" rx="4" ry="4" width="30%" height="100%" />
        </ContentLoader>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          {filtered.map((state) => {
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
                        right: 0,
                      },
                    }}
                  />
                </Card>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
