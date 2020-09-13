import React from "react";
import "./Sidebar.css";

export const Sidebar = ({ states, statesDailyData, onSelectState }) => {
  return (
    <section className="sidebar border-gray-700 border rounded-sm w-64 mr-10">
      <ul className="divide-y divide-gray-700 border-b border-gray-700">
        {states.map((state) => {
          const data = statesDailyData[state];
          console.log(data);
          return (
            <li key={state}>
              <button
                className="p-4 hover:bg-gray-800 w-full"
                type="button"
                key={state}
                onClick={() => onSelectState(state)}
              >
                {state}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
