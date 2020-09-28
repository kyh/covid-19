import React, { useState, useEffect } from "react";

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
  const [filtered, setFiltered] = useState([...states]);

  useEffect(() => {
    if (states.length) {
      setFiltered([...states]);
    }
  }, [states.length]);

  const onSelectState = (state) => {
    if (selectedState === state) {
      localStorage.removeItem("selectedState");
      setSelectedState(null);
    } else {
      localStorage.setItem("selectedState", state);
      setSelectedState(state);
    }
  };

  const onSearchState = (event) => {
    const value = event.target.value;
    if (!value) {
      setFiltered([...states]);
    } else {
      setFiltered(
        states.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
      );
    }
  };

  return (
    <PageContainer>
      <Sidebar
        states={filtered}
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
