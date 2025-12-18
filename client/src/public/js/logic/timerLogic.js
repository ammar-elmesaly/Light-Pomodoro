import { getActiveSession,
  getPausedSession,
  addSession,
  endSession,
  pauseSession,
  resumeSession,
  getActiveOrPausedSession
} from "../api/sessionsApi.js";
import { state } from "../state/timerState.js";
import {
  MAX_SESSION_DURATION,
  MIN_SESSION_DURATION
} from "../constants/session.js";

export const timerEvents = {
  onFinish: null,
  onTick: null
};

export async function getLastSessionState() {
  const res = await getActiveOrPausedSession();
  if (!res.ok) return res;

  const session = res.session;
  if (!session) return false;  // no active or paused

  state.remainingTime = calculateRemaining(session, state.waitTime);

  return session.status;
}

export function calculateRemaining(session, waitTime) {
  let totalPause = 0;
  let lastPauseStart = null;

  session.pauses.forEach(pause => {
    if (pause.end) totalPause += new Date(pause.end) - new Date(pause.start);
    else lastPauseStart = new Date(pause.start).getTime();
  });

  const start = new Date(session.startTime).getTime();

  if (lastPauseStart !== null) {  // The session was paused
    return Math.floor(waitTime - (lastPauseStart - start - totalPause));
  }

  // the session was active
  return Math.floor(waitTime - (Date.now() - start - totalPause));
}

export async function startTimer(newSession = true) {
  if (newSession) {  // start timer and generate a new session
    const res = await addSession(state.waitTime);
    if (!res.ok) return res;
  }

  let interval = setInterval(decrementTimer, 1000);
  
  state.running = true;
  
  return { ok: true, interval };
}

export async function stopTimer(intervalId) {
  clearInterval(intervalId);

  // end the session

  const res = await getActiveOrPausedSession();
  if (!res.ok) return res;

  const session = res.session;

  const endRes = await endSession(session._id);

  if (!endRes.ok) return endRes;

  state.remainingTime = state.waitTime;
  state.running = false;
  state.paused = false;

  return { ok: true }
}

export async function decrementTimer() {
  state.remainingTime -= 1000;  // 1 second

  if (timerEvents.onTick)
    timerEvents.onTick(state.remainingTime);

  if (state.remainingTime <= 0) {

    if (timerEvents.onFinish)
      timerEvents.onFinish();
  }
}

export async function pauseTimer(intervalId) {
  clearInterval(intervalId);
  state.paused = true;

  const activeRes = await getActiveSession();
  if (!activeRes.ok) return activeRes;

  const activeSession = activeRes.session;

  const pauseRes = await pauseSession(activeSession._id);
  if (!pauseRes.ok) return pauseRes;

  return { ok: true };
}

export async function unpauseTimer() {
  const startTimerRes = await startTimer(false);  // Don't start a new session
  if (!startTimerRes.ok) return startTimerRes;
  
  state.intervalId = startTimerRes.interval;
  state.paused = false;

  const pausedRes = await getPausedSession();
  if (!pausedRes.ok) return pausedRes;

  const pausedSession = pausedRes.session;
  
  const resumeRes = await resumeSession(pausedSession._id);
  if (!resumeRes.ok) return resumeRes;

  return { ok: true };
}

export function setWaitTime(newWaitTime) {
  newWaitTime = Number(newWaitTime);

  if (state.running)
    return { ok: false, error: "RUNNING" };

  if (!Number.isInteger(newWaitTime))
    return { ok: false, error: "NOT_INT" };

  if (newWaitTime > MAX_SESSION_DURATION || newWaitTime < MIN_SESSION_DURATION)
    return { ok: false, error: "OUT_OF_RANGE" };

  state.waitTime = newWaitTime;
  localStorage.setItem('waitTime', state.waitTime);

  return { ok: true };
}