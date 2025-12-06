import { setWaitTime, getLastSessionState, startTimer } from "../logic/timerLogic.js";
import { state } from "../state/timerState.js";
import { displayTime, setRunningUI, updatePauseIcon } from "../ui/timerUI.js";
import registerTimeListeners from "../listeners/timerListeners.js";
import { DEFAULT_TIME } from "../state/timerState.js";
import { handleResult } from "../ui/errorHandlers.js";

export async function initTimer() {
  const res = setWaitTime(localStorage.getItem('waitTime'));

  if (!res.ok) {  // If someone plays with localStorage manually, default to DEFAULT_TIME
    state.waitTime = DEFAULT_TIME;
    localStorage.setItem('waitTime', DEFAULT_TIME);
  }

  state.remainingTime = state.waitTime;

  const lastSessionState = await getLastSessionState();  // await checking if autoplay before event listeners are binded, so
  // race conditions are evaded - Insha'Allah :)

  if (lastSessionState === 'active') {
    const res = await startTimer(false);
    if (!handleResult(res)) return;

    state.running = true;
    state.intervalId = res.interval;
    setRunningUI();

  } else if (lastSessionState === 'paused') {
    state.running = true;
    state.paused = true;
    
    setRunningUI();
    updatePauseIcon(state.paused);
  }

  registerTimeListeners();

  displayTime(state.remainingTime);
}