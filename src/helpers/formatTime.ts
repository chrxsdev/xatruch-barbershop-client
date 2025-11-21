import { format, parse } from 'date-fns';

// Format from 24hrs to 12hrs
export const formatTime = (time: string): string => {
  const timeString12hr = new Date(`1970-01-01T${time}Z`).toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });
  return timeString12hr;
};

// Format 24hrs String to 24hrs Valid JS Date (08:00:00 to Sun Jan 07 2024 08:00:00 GMT-0600)
export const formatStringToDate = (time: string): Date | string => {
  if (time) return parse(time, 'HH:mm:ss', new Date());
  return '';
};

// Format JS Date (Sun Jan 07 2024 08:00:00 GMT-0600 to 08:00:00) to 24hrs String
export const formatTo24hrs = (time: Date): string => {
  return format(time, 'HH:mm:ss');
};

// Format JS Date (Sun Jan 07 2024 08:00:00 GMT-0600 to 08:00:00) to dd-MM-yyyy
export const formatToValidDate = (date: Date): string => {
  return format(date, 'dd-MM-yyyy');
};

// Format JS Date (Sun Jan 07 2024 08:00:00 GMT-0600 to 08:00:00) to yyyy-MM-dd
export const formatFullDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};
