import { getProjectTitle, getSelectedProjectId } from "../logic/mainLogic.js";
import { addProject, getProjects, deleteProject } from "../api/projectsApi.js";
import { deleteSessionHistory, updateSessions } from "../api/sessionsApi.js";
import { projectSelectElem, addProjectBtn, deleteProjectBtn, deleteHistoryBtn } from "../dom/mainDOM.js";
import { displayProjects, displaySessions } from "../ui/mainUI.js";
import { handleResult } from "../ui/errorHandlers.js";
import { SESSIONS } from "../state/sessionState.js";

async function clickAddProjectBtn() {
  const title = getProjectTitle();
  const addProjectRes = await addProject(title);
  if (!handleResult(addProjectRes)) return;
  
  const getProjectsRes = await getProjects();
  if (!handleResult(getProjectsRes)) return;

  displayProjects(getProjectsRes.projects);

  projectSelectElem.lastElementChild.selected = true;  // select the newly added project
  const displayRes = displaySessions(SESSIONS.getSessions());  // update the sessions to filter properly
  handleResult(displayRes);
}

async function changeSelectedProject() {
  localStorage.setItem('selectedProjectIndex', projectSelectElem.selectedIndex)
  const res = displaySessions(SESSIONS.getSessions());
  handleResult(res);
}

async function clickDeleteProjectBtn() {
  const res = getSelectedProjectId();
  if (!handleResult(res)) return;
  
  const confirm = window.confirm('Are you sure to delete this project?');
  if (!confirm) return;

  const projectId = res.projectId;
  const deleteProjectRes = await deleteProject(projectId);

  if (!handleResult(deleteProjectRes)) return;

  const getProjectsRes = await getProjects();
  if (!handleResult(getProjectsRes)) return;

  displayProjects(getProjectsRes.projects);

  projectSelectElem.lastElementChild.selected = true;  // select the last project
  const displayRes = displaySessions(SESSIONS.getSessions());
  handleResult(displayRes);
}

async function clickDeleteHistoryBtn() {
  const projectIdRes = getSelectedProjectId();
  if (!handleResult(projectIdRes)) return;

  const projectId = projectIdRes.projectId;

  const deleteHistoryRes = await deleteSessionHistory(projectId);
  if (!handleResult(deleteHistoryRes)) return;

  const updateSessionsRes = await updateSessions();
  if (!handleResult(updateSessionsRes)) return;

  const displayRes = displaySessions(SESSIONS.getSessions());
  handleResult(displayRes);
}

function registerListeners() {
  addProjectBtn.addEventListener('click', clickAddProjectBtn);
  deleteProjectBtn.addEventListener('click', clickDeleteProjectBtn);
  deleteHistoryBtn.addEventListener('click', clickDeleteHistoryBtn);
  projectSelectElem.addEventListener('change', changeSelectedProject);
}

export default registerListeners;