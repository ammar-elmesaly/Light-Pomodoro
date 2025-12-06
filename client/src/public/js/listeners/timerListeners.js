import {
  startTimer,
  stopTimer,
  pauseTimer,
  unpauseTimer,
  setWaitTime,
} from '../logic/timerLogic.js';
import { handleWaitTimeResult, handleResult } from '../ui/errorHandlers.js';
import { startBtn, pauseBtn, incBtn, decBtn } from '../dom/timerDOM.js';
import { setRunningUI, setStoppedUI, updatePauseIcon, displayTime } from '../ui/timerUI.js';
import { state } from '../state/timerState.js';
import { updateSessions } from '../api/sessionsApi.js';
import { displaySessions } from '../ui/mainUI.js';
import { SESSIONS } from '../state/sessionState.js';

async function clickStartBtn() {  // start button works both as a start and a stop button
  if (!state.running) {
    const res = await startTimer();
    if (!handleResult(res)) return;

    setRunningUI();

    state.intervalId = res.interval;

  } else {
    const res = await stopTimer(state.intervalId);
    if (!handleResult(res)) return;

    setStoppedUI();
    updatePauseIcon(state.paused);
    displayTime(state.remainingTime);
  }

  const updateSessionsRes = await updateSessions();
  if (!handleResult(updateSessionsRes)) return;
  displaySessions(SESSIONS.getSessions());
}

async function clickPauseBtn() {
  if (!state.running) {
    return;
  }

  if (state.paused) {
    const unpauseRes = await unpauseTimer();
    if (!handleResult(unpauseRes)) return;

    updatePauseIcon(state.paused);

  } else {
    const pauseRes = await pauseTimer(state.intervalId);
    if (!handleResult(pauseRes)) return;

    updatePauseIcon(state.paused);
  }

  const updateSessionsRes = await updateSessions();
  if (!handleResult(updateSessionsRes)) return;
  displaySessions(SESSIONS.getSessions());
}

function clickIncBtn() {
  const res = setWaitTime(state.waitTime + 5 * 60);
  if (!handleWaitTimeResult(res)) return;

  state.remainingTime = state.waitTime;
  displayTime(state.remainingTime);
}

function clickDecBtn() {
  const res = setWaitTime(state.waitTime - 5 * 60);
  if (!handleWaitTimeResult(res)) return;

  state.remainingTime = state.waitTime;
  displayTime(state.remainingTime);
}

function registerListeners() {
  startBtn.addEventListener('click', clickStartBtn);
  pauseBtn.addEventListener('click', clickPauseBtn);
  incBtn.addEventListener('click', clickIncBtn);
  decBtn.addEventListener('click', clickDecBtn);
}

export default registerListeners;