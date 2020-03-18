import useFetch from 'react-fetch-hook';

export const useGetUSData = () => {
  const { isLoading, data = [] } = useFetch('https://covidtracking.com/api/us');
  const [currentData] = data;

  return { isLoading, data: currentData || {} };
};
