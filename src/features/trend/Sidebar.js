import React from "react";
import { stateAbbrevToFullname } from "utils/map-utils";
import { Progress } from "components/Progress";

export const Sidebar = ({
  states,
  isLoading,
  selectedState,
  onSelectState,
  statesDailyData,
  usDailyData,
}) => {
  const lastUSDay = usDailyData[usDailyData.length - 1];
  return (
    <section className="sidebar border-gray-700 border rounded-sm w-64 mr-10">
      <ul className="divide-y divide-gray-700 border-b border-gray-700">
        {states.map((state) => {
          const data = statesDailyData[state];
          const lastDay = data[data.length - 1];
          return (
            <li key={state}>
              <button
                className={`p-4 hover:bg-gray-800 w-full text-sm text-left ${
                  selectedState === state ? "bg-gray-800" : ""
                }`}
                type="button"
                key={state}
                onClick={() => onSelectState(state)}
              >
                <div className="flex justify-between mb-2">
                  <span>{stateAbbrevToFullname[state]}</span>
                  <span>{lastDay.positive}</span>
                </div>
                <Progress value={lastDay.positive} total={lastUSDay.positive} />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
