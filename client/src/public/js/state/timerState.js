export const DEFAULT_TIME = 25 * 60;

export const state = {
  running: false,
  paused: false,
  intervalId: null,
  waitTime: DEFAULT_TIME,
  remainingTime: DEFAULT_TIME,
};
