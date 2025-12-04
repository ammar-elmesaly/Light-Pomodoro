import { formatTime } from '../utils.js';
import { startBtn, pauseBtn, timeAdjustElem, timeDisplayElem} from '../dom/timerDOM.js';

export function setRunningUI() {
  startBtn.textContent = "Stop";
  startBtn.classList.add("start-btn-running");
  pauseBtn.classList.add("pause-btn-running");
  timeAdjustElem.classList.add("disable-time-adjust");
}

export function setStoppedUI() {
  startBtn.textContent = "Start";
  startBtn.classList.remove("start-btn-running");
  pauseBtn.classList.remove("pause-btn-running");
  timeAdjustElem.classList.remove("disable-time-adjust");
}

export function updatePauseIcon(paused) {
  const icon = pauseBtn.querySelector("i");
  icon.classList.toggle("bi-play", paused);
  icon.classList.toggle("bi-pause", !paused);
}

export function displayTime (remainingTime) {
  timeDisplayElem.textContent = formatTime(remainingTime);
}

export function playAlertSound() {
  const alarm = new Audio('sounds/alarm.mp3');
  alarm.play();
}