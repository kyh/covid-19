import React from 'react';
import { useGetStatesData } from 'hooks/useGetStatesData';
import { PageContainer } from 'components/PageContainer';
import { Map } from 'components/Map';

export const MapPage = () => {
  const { stateToData, totalPositives, isLoading } = useGetStatesData();
  return (
    <PageContainer>
      {isLoading ? null : (
        <Map stateToData={stateToData} totalPositives={totalPositives} />
      )}
    </PageContainer>
  );
};
