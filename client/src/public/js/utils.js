import { MINUTE } from "./constants/time.js";

export function formatTime(remainingTime) {
  // remaining Time in ms
  const minutes = Math.floor(remainingTime / MINUTE);
  const seconds = Math.floor((remainingTime - minutes * MINUTE) / 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}