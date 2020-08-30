import useFetch from "react-fetch-hook";

export const useGetUSData = () => {
  const { isLoading, data = [] } = useFetch("https://api.covidtracking.com/us");
  const [currentData] = data;

  return { isLoading, data: currentData || {} };
};
