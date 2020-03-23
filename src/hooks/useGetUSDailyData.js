import useFetch from 'react-fetch-hook';
import { formatDaily } from 'utils/formatter';

export const useGetUSDailyData = () => {
  const { isLoading, data = [] } = useFetch(
    'https://covidtracking.com/api/us/daily'
  );
  let formatted = [];
  if (Array.isArray(data)) {
    formatted = data.map(d => formatDaily(d)).sort((a, b) => a.date - b.date);
  }

  return { isLoading, data: formatted };
};
