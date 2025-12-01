import { getSessions, addSession, showError } from "./main.js";

const DEFAULT_TIME = 25 * 60;

let REMAINING_TIME = DEFAULT_TIME; // time in seconds
// TODO maybe get time from server?
let RUNNING = false;
let PAUSED = false;
let INTERVAL_ID;

const shouldAutoplay = await shouldAutoplayTimer();  // await checking if autoplay before event listeners are binded, so
// race conditions are evaded - Insha'Allah :)


const startBtn = document.querySelector('#start-btn');
const pauseBtn = document.querySelector('#pause-btn');
const timeDisplayElem = document.querySelector('#time-display');

if (shouldAutoplay) {
  INTERVAL_ID = startTimer();
}

startBtn.addEventListener('click', clickStartBtn);
pauseBtn.addEventListener('click', clickPauseBtn);


async function shouldAutoplayTimer() {  // Autoplays timer if use has an active session
  const session = await getOngoingSession();

  if (session) {
    const unixStartTime = new Date(session.startTime).getTime();
    REMAINING_TIME = Math.floor(DEFAULT_TIME - (Date.now() - unixStartTime) / 1000);
    return true;  // returns true if it found a valid session
  }
  return false
}

async function getOngoingSession() {  // This function will check if the user had an ongoing session
  const sessions = await getSessions();

  let matching_session;

  sessions.forEach(session => {
    if (session.status === 'active') {
      matching_session =  session;
    }
  });

  return matching_session;
}

async function clickStartBtn() {
  if (!RUNNING) {
    await addSession();
    INTERVAL_ID = startTimer();
  } else {
    stopTimer(INTERVAL_ID);
  }
}

function clickPauseBtn() {
  if (!RUNNING) {
    return;
  }

  if (PAUSED) {
    unpauseTimer();

  } else {
    pauseTimer(INTERVAL_ID);
  }

}

function startTimer() {
  let interval = setInterval(decrementTimer, 1000);

  startBtn.textContent = 'Stop';
  startBtn.classList.add('start-btn-running');
  pauseBtn.classList.add('pause-btn-running');

  RUNNING = true;

  return interval;
}

function stopTimer(intervalId) {
  clearInterval(intervalId);

  startBtn.textContent = 'Start';
  startBtn.classList.remove('start-btn-running');
  pauseBtn.classList.remove('pause-btn-running');

  REMAINING_TIME = DEFAULT_TIME;
  RUNNING = false;

  PAUSED = false;
  updatePausedIcon(PAUSED);

  displayTime(DEFAULT_TIME);
}

function pauseTimer(intervalId) {
  clearInterval(intervalId);
  PAUSED = true;
  updatePausedIcon(PAUSED);
}

function unpauseTimer() {
  INTERVAL_ID = startTimer();  // Temporarily solution
  PAUSED = false;
  updatePausedIcon(PAUSED);
}

function updatePausedIcon(PAUSED) {
  if (PAUSED) {  // if it's PAUSED, then show the play icon (bi-play)
    pauseBtn.querySelector('i').classList.add('bi-play');
    pauseBtn.querySelector('i').classList.remove('bi-pause');

  } else {
    pauseBtn.querySelector('i').classList.remove('bi-play');
    pauseBtn.querySelector('i').classList.add('bi-pause');
  }
}

function decrementTimer() {
  REMAINING_TIME--;
  if (REMAINING_TIME < 0) { // Time goes negative then time is up
    stopTimer(INTERVAL_ID);
    playAlertSound();
    return;
  }
  displayTime(REMAINING_TIME);
}

function displayTime (remainingTime) {
  timeDisplayElem.textContent = formatTime(remainingTime);
}

export function formatTime(remainingTime) {
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime - minutes * 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function playAlertSound() {
  const alarm = new Audio('sounds/alarm.mp3');
  alarm.play();
}