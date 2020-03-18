import { parse } from 'date-fns';

export const formatDaily = data => {
  const dateString = data.date.toString();
  return {
    ...data,
    date: parse(dateString, 'yyyyMMdd', new Date())
  };
};
