import React, { useState, useEffect } from 'react';

import { useGetUSDailyData } from 'hooks/useGetUSDailyData';
import { useGetStatesDailyData } from 'hooks/useGetStatesDailyData';

import { Featured } from './Featured';
import { States } from './States';

export const Dashboard = () => {
  const { isLoading: isLoadingDaily, data: usDailyData } = useGetUSDailyData();
  const {
    isLoading: isLoadingStates,
    data: statesDailyData,
    states
  } = useGetStatesDailyData();

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
    <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
      <Featured
        dailyData={statesDailyData[selectedState] || usDailyData}
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
    </div>
  );
};
