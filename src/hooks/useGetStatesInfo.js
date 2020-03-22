import useFetch from 'react-fetch-hook';

export const useGetStatesInfo = () => {
  const { isLoading, data = [] } = useFetch(
    'https://covidtracking.com/api/states/info'
  );
  const formatted = data.reduce((map, d) => {
    map[d.state] = d;
    return map;
  }, {});

  return { isLoading, data: formatted };
};
