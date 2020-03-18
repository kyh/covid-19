import useFetch from 'react-fetch-hook';
import { formatDaily } from 'utils/formatter';

export const useGetUSDailyData = () => {
  const { isLoading, data = [] } = useFetch(
    'https://covidtracking.com/api/us/daily'
  );
  const formatted = data.map(d => formatDaily(d));

  return { isLoading, data: formatted };
};
