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
    <>
      <section className="sidebar border-gray-700 border rounded-sm w-64 mr-10 hidden sm:block">
        <ul className="divide-y divide-gray-700 border-b border-gray-700">
          {states.map((state) => {
            const data = statesDailyData[state];
            const lastDay = data[data.length - 1];
            return (
              <li key={state}>
                <button
                  className={`p-4 w-full text-sm text-left focus:outline-none transition duration-150 ease-in-out ${
                    selectedState === state ? "bg-gray-800" : ""
                  } hover:bg-gray-800`}
                  type="button"
                  key={state}
                  onClick={() => onSelectState(state)}
                >
                  <div className="flex justify-between mb-2">
                    <span>{stateAbbrevToFullname[state]}</span>
                    <span>{lastDay.positive.toLocaleString()}</span>
                  </div>
                  <Progress
                    value={lastDay.positive}
                    total={lastUSDay.positive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="px-4 mb-4 sm:hidden">
        <select
          className="form-select w-full px-4 py-2 rounded-md border border-gray-400 text-xs font-medium focus:outline-none hover:bg-gray-800 transition ease-in-out duration-150 whitespace-no-wrap bg-gray-900"
          value={selectedState}
          onChange={(event) => onSelectState(event.target.value)}
        >
          <option value={null} key="null">
            United States
          </option>
          <optgroup label="States">
            {states.map((state) => (
              <option value={state} key={state}>
                {stateAbbrevToFullname[state]}
              </option>
            ))}
          </optgroup>
        </select>
      </section>
    </>
  );
};
