import React, { useState, useEffect } from 'react';

import { useGetUSDailyData } from 'hooks/useGetUSDailyData';
import { useGetStatesDailyData } from 'hooks/useGetStatesDailyData';
import { useGetStatesInfo } from 'hooks/useGetStatesInfo';

import { PageContainer } from 'components/PageContainer';
import { Featured } from './Featured';
import { States } from './States';

export const DashboardPage = () => {
  const { isLoading: isLoadingDaily, data: usDailyData } = useGetUSDailyData();
  const {
    isLoading: isLoadingStates,
    data: statesDailyData,
    states
  } = useGetStatesDailyData();
  const { data: statesInfo } = useGetStatesInfo();

  const [selectedState, setSelectedState] = useState(null);
  const [filtered, setFiltered] = useState([...states]);

  useEffect(() => {
    if (states.length) {
      setFiltered([...states]);
    }
  }, [states.length]);

  const onSelectState = state => {
    if (selectedState === state) {
      setSelectedState(null);
    } else {
      setSelectedState(state);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const onSearchState = event => {
    const value = event.target.value;
    if (!value) {
      setFiltered([...states]);
    } else {
      setFiltered(
        states.filter(s => s.toLowerCase().includes(value.toLowerCase()))
      );
    }
  };

  return (
    <PageContainer>
      <Featured
        dailyData={statesDailyData[selectedState] || usDailyData}
        statesInfo={statesInfo}
        selectedState={selectedState}
        isLoading={isLoadingDaily}
      />
      <States
        states={states}
        filtered={filtered}
        isLoading={isLoadingStates}
        selectedState={selectedState}
        statesDailyData={statesDailyData}
        onSelectState={onSelectState}
        onSearchState={onSearchState}
      />
    </PageContainer>
  );
};
