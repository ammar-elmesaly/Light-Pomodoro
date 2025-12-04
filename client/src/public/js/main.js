import { initMain } from "./init/mainInit.js";
import { initTimer } from "./init/timerInit.js";

async function init() {
  initTimer();
  initMain();
}

init();