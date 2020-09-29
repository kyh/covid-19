import React from "react";
import { useGetStatesData } from "hooks/useGetStatesData";
import { Loader } from "components/Loader";
import { PageContainer } from "components/PageContainer";
import { Map } from "components/Map";

export const DistributionPage = () => {
  const { stateToData, totalPositives, isLoading } = useGetStatesData();
  return (
    <PageContainer>
      <section className="w-full">
        <div className="text-xs uppercase text-gray-400 mb-1 font-semibold">
          Distribution across states
        </div>
        {isLoading ? (
          <Loader width="100%" height="600">
            <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
          </Loader>
        ) : (
          <Map stateToData={stateToData} totalPositives={totalPositives} />
        )}
      </section>
    </PageContainer>
  );
};
