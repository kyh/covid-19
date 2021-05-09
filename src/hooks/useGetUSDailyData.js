import useSWR from "swr";
import { formatDaily } from "utils/formatter";

export const useGetUSDailyData = () => {
  const { data = [] } = useSWR("/data/us.json");
  let formatted = [];
  if (Array.isArray(data)) {
    formatted = data.map((d) => formatDaily(d)).sort((a, b) => a.date - b.date);
  }

  return { isLoading: !data.length, data: formatted };
};
