import useSWR from "swr";

export const useGetUSData = () => {
  const { data = [] } = useSWR("https://api.covidtracking.com/us");
  const [currentData] = data;

  return { isLoading: !data.length, data: currentData || {} };
};
