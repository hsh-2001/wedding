import { format } from 'date-fns';

const dateTimeForDisplay = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'yyyy-MM-dd HH:mm:ss');
};

const timeForDisplay = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'HH:mm:ss');
};

const dateForDisplay = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'yyyy-MMMM-dd');
};

export default {
    dateTimeForDisplay,
    timeForDisplay,
    dateForDisplay,
}