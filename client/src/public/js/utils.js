export function formatTime(remainingTime) {
  // remaining Time in seconds
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime - minutes * 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}