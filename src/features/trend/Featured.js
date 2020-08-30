import React from "react";
import ContentLoader from "react-content-loader";

import { Card } from "components/Card";
import { StatTotal } from "components/StatTotal";
import { StatGrowth } from "components/StatGrowth";
import { StatMortality } from "components/StatMortality";
import { StatStateDetails } from "components/StatStateDetails";
import { LineChart } from "components/LineChart";

export const Featured = ({
  dailyData,
  statesInfo,
  selectedState,
  isLoading,
}) => {
  return (
    <div className="sm:flex pb-8 px-4 sm:px-0">
      <div className="sm:w-3/4 sm:pr-10">
        <div className="mb-2">
          <StatTotal
            data={dailyData}
            selectedState={selectedState}
            isLoading={isLoading}
          />
        </div>
        {dailyData.length ? (
          <LineChart data={dailyData} />
        ) : (
          <ContentLoader style={{ width: "100%", height: "300px" }}>
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
          </ContentLoader>
        )}
      </div>
      <div className="sm:w-1/4">
        <Card>
          <div className="mb-5">
            <StatGrowth data={dailyData} isLoading={isLoading} />
          </div>
          <div className="mb-5">
            <StatMortality data={dailyData} isLoading={isLoading} />
          </div>
          {selectedState && statesInfo[selectedState] && (
            <StatStateDetails stateInfo={statesInfo[selectedState]} />
          )}
        </Card>
      </div>
    </div>
  );
};
