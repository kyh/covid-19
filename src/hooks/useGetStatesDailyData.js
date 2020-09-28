import useSWR from "swr";
import { formatDaily } from "utils/formatter";

export const useGetStatesDailyData = () => {
  const { data = [] } = useSWR("https://api.covidtracking.com/states/daily");

  let formatted = {};
  if (Array.isArray(data)) {
    formatted = data
      .map((d) => formatDaily(d))
      .sort((a, b) => a.date - b.date)
      .reduce((acc, state) => {
        if (!acc[state.state]) {
          acc[state.state] = [state];
        } else {
          acc[state.state].push(state);
        }
        return acc;
      }, {});
  }

  return {
    isLoading: !data.length,
    data: formatted,
    states: Object.keys(formatted).sort(),
  };
};
