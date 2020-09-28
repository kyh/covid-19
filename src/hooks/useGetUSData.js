import useSWR from "swr";

export const useGetUSData = () => {
  const { isLoading, data = [] } = useSWR("https://api.covidtracking.com/us");
  const [currentData] = data;

  return { isLoading, data: currentData || {} };
};
