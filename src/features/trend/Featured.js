import React from "react";
import { differenceInDays } from "date-fns";
import ContentLoader from "react-content-loader";
import { Card } from "components/Card";
import { StatCard, StatRow } from "components/StatCard";
import { LineChart } from "components/LineChart";
import { growthRate } from "utils/stats";

export const Featured = ({
  dailyData,
  statesInfo,
  selectedState,
  isLoading,
}) => {
  const today = dailyData[dailyData.length - 1];
  const firstDay = dailyData[0];
  const twoWeeksAgo = dailyData[dailyData.length - 13];
  console.log(today);
  return (
    <section className="featured-content flex flex-col flex-1">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <StatCard
          label="Total Cases"
          color="teal"
          value={today && today.positive.toLocaleString()}
          isLoading={isLoading}
        />
        <StatCard
          label="First Case"
          color="gray"
          value={differenceInDays(new Date(), firstDay && firstDay.date)}
          suffix="days ago"
          isLoading={isLoading}
        />
        <StatCard
          label="Recovered"
          color="green"
          value={
            today && today.recovered
              ? today.recovered.toLocaleString()
              : "Unknown"
          }
          isLoading={isLoading}
        />
        <StatCard
          label="Deaths"
          color="red"
          value={today && today.death.toLocaleString()}
          isLoading={isLoading}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card>
          <StatRow
            label="2 week average change in new cases"
            value={
              today &&
              `${growthRate(
                twoWeeksAgo.positiveIncrease,
                today.positiveIncrease
              )}%`
            }
            isLoading={isLoading}
            lowercase
          />
          <StatRow
            label="New daily cases today"
            value={today && today.positiveIncrease.toLocaleString()}
            isLoading={isLoading}
            lowercase
          />
          <StatRow
            label="New daily cases 2 weeks ago"
            value={
              twoWeeksAgo
                ? twoWeeksAgo.positiveIncrease.toLocaleString()
                : "N/A"
            }
            isLoading={isLoading}
            lowercase
          />
        </Card>
        <Card>
          <StatRow
            label="2 week average change in deaths"
            value={
              today &&
              `${growthRate(twoWeeksAgo.deathIncrease, today.deathIncrease)}%`
            }
            isLoading={isLoading}
            lowercase
          />
          <StatRow
            label="New death cases today"
            value={today && today.deathIncrease.toLocaleString()}
            isLoading={isLoading}
            lowercase
          />
          <StatRow
            label="New death cases 2 weeks ago"
            value={
              twoWeeksAgo ? twoWeeksAgo.deathIncrease.toLocaleString() : "N/A"
            }
            isLoading={isLoading}
            lowercase
          />
        </Card>
      </div>
      <Card className="flex-1">
        <LineChart data={dailyData} />
      </Card>
    </section>
  );
};
