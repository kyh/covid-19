import React from "react";
import { formatDistanceStrict } from "date-fns";
import ContentLoader from "react-content-loader";
import { Card } from "components/Card";
import { StatCard } from "components/StatCard";
import { LineChart } from "components/LineChart";

export const Featured = ({
  dailyData,
  statesInfo,
  selectedState,
  isLoading,
}) => {
  const today = dailyData[dailyData.length - 1];
  const firstDay = dailyData[0];

  return (
    <section className="featured-content flex-1">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-4">
        {!!dailyData.length && (
          <StatCard
            label="Total Cases"
            color="teal"
            value={today.positive.toLocaleString()}
          />
        )}
        {!!dailyData.length && (
          <StatCard
            label="First Case"
            color="gray"
            value={formatDistanceStrict(firstDay.date, new Date(), {
              unit: "day",
              addSuffix: true,
            })}
          />
        )}
        {!!dailyData.length && (
          <StatCard
            label="Recovered"
            color="green"
            value={
              today.recovered ? today.recovered.toLocaleString() : "Unknown"
            }
          />
        )}
        {!!dailyData.length && (
          <StatCard
            label="Deaths"
            color="red"
            value={today.death.toLocaleString()}
          />
        )}
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
