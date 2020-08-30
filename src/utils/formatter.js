import { parse } from "date-fns";

export const formatDaily = (data) => {
  const dateString = data.date.toString();
  return {
    ...data,
    date: parse(dateString, "yyyyMMdd", new Date()),
  };
};

export const numberWithCommas = (x) => {
  if (!x) return "";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
