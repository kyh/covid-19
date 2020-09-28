import useSWR from "swr";

export const useGetStatesData = () => {
  const { isLoading, data = [] } = useSWR(
    "https://api.covidtracking.com/states"
  );
  let totalPositives = 0;
  const stateToData = data.reduce((map, d) => {
    totalPositives += d.positive;
    map[d.state] = d;
    return map;
  }, {});
  return { isLoading, stateToData, totalPositives };
};
