import { showError } from "./mainUI.js";

export function handleWaitTimeResult(res) {
  if (res.ok) return true;

  const messages = {
    OUT_OF_RANGE: 'Wait time must be 5-60 minutes.',
    RUNNING: 'Cannot change wait time while running.',
    NOT_INT: 'Time must be an integer.'
  };

  showError(messages[res.error]);
  return false;
}

export function handleResult(res) {
  if (!res.ok) {
    showError(res.error);
    return false;
  }


  return true;
}