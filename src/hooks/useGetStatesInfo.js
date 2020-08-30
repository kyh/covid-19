import useFetch from 'react-fetch-hook';

export const useGetStatesInfo = () => {
  const { isLoading, data = [] } = useFetch(
    'https://api.covidtracking.com/states/info'
  );

  let formatted = {};
  if (Array.isArray(data)) {
    formatted = data.reduce((map, d) => {
      map[d.state] = d;
      return map;
    }, {});
  }

  return { isLoading, data: formatted };
};
