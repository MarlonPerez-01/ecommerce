const milisecondsInMinute = 60_000;

export const addMinutes = (date: Date, minutes: number): Date =>
  new Date(date.getTime() + minutes * milisecondsInMinute);
