import useFetch from 'react-fetch-hook';
import { formatDaily } from 'utils/formatter';

export const useGetStatesDailyData = () => {
  const { isLoading, data = [] } = useFetch(
    'https://covidtracking.com/api/states/daily'
  );
  const formatted = data
    .map(d => formatDaily(d))
    .reduce((acc, state) => {
      if (!acc[state.state]) {
        acc[state.state] = [state];
      } else {
        acc[state.state].push(state);
      }
      return acc;
    }, {});

  return { isLoading, data: formatted, states: Object.keys(formatted) };
};
