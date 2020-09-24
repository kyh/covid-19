import React from "react";
import { differenceInDays } from "date-fns";
import ContentLoader from "react-content-loader";
import { Card } from "components/Card";
import { StatCard, StatRow } from "components/StatCard";
import { LineChart } from "components/LineChart";

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
    <section className="featured-content flex-1 grid">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-4">
        <StatCard
          label="Total Cases"
          color="teal"
          value={today && today.positive.toLocaleString()}
          isLoading={!!dailyData.length}
        />
        <StatCard
          label="First Case"
          color="gray"
          value={differenceInDays(new Date(), firstDay && firstDay.date)}
          suffix="days ago"
          isLoading={!!dailyData.length}
        />
        <StatCard
          label="Recovered"
          color="green"
          value={
            today && today.recovered
              ? today.recovered.toLocaleString()
              : "Unknown"
          }
          isLoading={!!dailyData.length}
        />
        <StatCard
          label="Deaths"
          color="red"
          value={today && today.death.toLocaleString()}
          isLoading={!!dailyData.length}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
        <Card>
          <StatRow
            label="2 week average change in new cases"
            value="7.7%"
            isLoading={!!dailyData.length}
          />
          <StatRow
            label="New daily cases today"
            value={today && today.positiveIncrease.toLocaleString()}
            isLoading={!!dailyData.length}
            lowercase
          />
          <StatRow
            label="New daily cases 2 weeks ago"
            value={
              twoWeeksAgo
                ? twoWeeksAgo.positiveIncrease.toLocaleString()
                : "N/A"
            }
            isLoading={!!dailyData.length}
            lowercase
          />
        </Card>
        <Card>
          <StatRow
            label="2 week average change in deaths"
            isLoading={!!dailyData.length}
          />
          <StatRow
            label="Average Deaths Yesterday"
            value="93"
            isLoading={!!dailyData.length}
            lowercase
          />
          <StatRow
            label="Average Deaths 2 Weeks Ago"
            value="107"
            isLoading={!!dailyData.length}
            lowercase
          />
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
