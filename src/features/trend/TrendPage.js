import React, { useState } from "react";

import { useGetUSDailyData } from "hooks/useGetUSDailyData";
import { useGetStatesDailyData } from "hooks/useGetStatesDailyData";

import { PageContainer } from "components/PageContainer";
import { Sidebar } from "features/trend/Sidebar";
import { Featured } from "./Featured";
import "./TrendPage.css";

export const TrendPage = () => {
  const { isLoading: isLoadingDaily, data: usDailyData } = useGetUSDailyData();
  const {
    isLoading: isLoadingStates,
    data: statesDailyData,
    states,
  } = useGetStatesDailyData();

  const [selectedState, setSelectedState] = useState(
    localStorage.getItem("selectedState")
  );

  const onSelectState = (state) => {
    if (selectedState === state) {
      localStorage.removeItem("selectedState");
      setSelectedState(null);
    } else {
      localStorage.setItem("selectedState", state);
      setSelectedState(state);
    }
  };

  return (
    <PageContainer>
      <Sidebar
        states={states}
        isLoading={isLoadingStates}
        selectedState={selectedState}
        onSelectState={onSelectState}
        statesDailyData={statesDailyData}
        usDailyData={usDailyData}
      />
      <Featured
        dailyData={statesDailyData[selectedState] || usDailyData}
        selectedState={selectedState}
        isLoading={isLoadingDaily}
      />
    </PageContainer>
  );
};
