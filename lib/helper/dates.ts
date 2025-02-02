import { intervalToDuration } from "date-fns";

export const DateToDurationString = (
  end: Date | null | undefined,
  start: Date | null | undefined
) => {
  if (!start || !end) return "_m _s";

  const timeElapsed = end.getTime() - start.getTime();

  if (timeElapsed < 1000) {
    // less than one second
    return `${timeElapsed}ms`;
  }

  const duration = intervalToDuration({ start: 0, end: timeElapsed });

  return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
};
