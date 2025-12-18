import { DEFAULT_SESSION_DURATION } from "../constants/session.js";

export const state = {
  running: false,
  paused: false,
  intervalId: null,
  waitTime: DEFAULT_SESSION_DURATION,
  remainingTime: DEFAULT_SESSION_DURATION,
};
