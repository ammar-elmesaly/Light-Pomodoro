import { displayProjects, displaySessions } from "../ui/mainUI.js";
import { getProjects } from "../api/projectsApi.js";
import { updateSessions } from "../api/sessionsApi.js";
import registerMainListeners from "../listeners/mainListeners.js";
import { handleResult } from "../ui/errorHandlers.js";
import { SESSIONS } from "../state/sessionState.js";

export async function initMain() {
  const getProjectsRes = await getProjects();
  if (!handleResult(getProjectsRes)) return;
  displayProjects(getProjectsRes.projects);

  // gets sessions and updates global session array
  const updateSessionsRes = await updateSessions();
  if (!handleResult(updateSessionsRes)) return;
  displaySessions(SESSIONS.getSessions());

  registerMainListeners();
}