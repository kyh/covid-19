import useFetch from 'react-fetch-hook';

export const useGetStatesData = () => {
  const { isLoading, data = [] } = useFetch(
    'https://covidtracking.com/api/states'
  );
  let totalPositives = 0;
  const stateToData = data.reduce((map, d) => {
    totalPositives += d.positive;
    map[d.state] = d;
    return map;
  }, {});
  return { isLoading, stateToData, totalPositives };
};
