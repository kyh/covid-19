import React from 'react';
import ContentLoader from 'react-content-loader';
import { useGetStatesData } from 'hooks/useGetStatesData';
import { PageContainer } from 'components/PageContainer';
import { Map } from 'components/Map';

export const CurrentPage = () => {
  const { stateToData, totalPositives, isLoading } = useGetStatesData();
  return (
    <PageContainer>
      <div className="text-xs uppercase text-gray-600 mb-1 font-semibold">
        Distribution across states
      </div>
      {isLoading ? (
        <ContentLoader width="100%" height="600">
          <rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        </ContentLoader>
      ) : (
        <Map stateToData={stateToData} totalPositives={totalPositives} />
      )}
    </PageContainer>
  );
};
