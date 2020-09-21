import React from "react";
import ContentLoader from "react-content-loader";

import { Card } from "components/Card";
import { StatTotal } from "components/StatTotal";
import { StatGrowth } from "components/StatGrowth";
import { StatMortality } from "components/StatMortality";
import { StatStateDetails } from "components/StatStateDetails";
import { LineChart } from "components/LineChart";

const Point = ({ label = "", color = "green" }) => {
  return (
    <span
      aria-label={label}
      className={`h-4 w-4 bg-${color}-800 rounded-full flex items-center justify-center bg-opacity-50`}
    >
      <span className={`h-2 w-2 bg-${color}-500 rounded-full`} />
    </span>
  );
};

export const Featured = ({
  dailyData,
  statesInfo,
  selectedState,
  isLoading,
}) => {
  return (
    <section className="featured-content flex-1">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-4">
        <Card>
          <Point label="Total Cases" color="teal" />
          <p className="text-xs font-medium uppercase">Total Cases</p>
        </Card>
        <Card>
          <Point label="First Case" color="gray" />
          <p className="text-xs font-medium uppercase">First Case</p>
        </Card>
        <Card>
          <Point label="Recovered" color="green" />
          <p className="text-xs font-medium uppercase">Recovered</p>
        </Card>
        <Card>
          <Point label="Deaths" color="red" />
          <p className="text-xs font-medium uppercase">Deaths</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
        <Card>
          <p className="text-xs font-medium uppercase">
            2 WEEK AVERAGE CHANGE IN NEW CASES
          </p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase">
            2 WEEK AVERAGE CHANGE IN DEATHS
          </p>
        </Card>
      </div>
      {dailyData.length ? (
        <Card className="w-full">
          <LineChart data={dailyData} />
        </Card>
      ) : (
        <ContentLoader style={{ width: "100%", height: "300px" }}>
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        </ContentLoader>
      )}
    </section>
  );
};
