import { getProjectTitle } from "../logic/mainLogic.js";
import { addProject, getProjects } from "../api/projectsApi.js";
import { projectSelectElem, addProjectBtn } from "../dom/mainDOM.js";
import { displayProjects, displaySessions } from "../ui/mainUI.js";
import { handleResult } from "../ui/errorHandlers.js";
import { SESSIONS } from "../state/sessionState.js";

export async function clickAddProjectBtn() {
  const title = getProjectTitle();
  const addProjectRes = await addProject(title);
  if (!handleResult(addProjectRes)) return;
  
  const getProjectsRes = await getProjects();
  if (!handleResult(getProjectsRes)) return;

  displayProjects(getProjectsRes.projects);

  projectSelectElem.lastElementChild.selected = true;  // select the newly added project
  displaySessions(SESSIONS.getSessions());  // update the sessions to filter properly
}

export async function changeSelectedProject() {
  localStorage.setItem('selectedProjectIndex', projectSelectElem.selectedIndex)
  displaySessions(SESSIONS.getSessions());
}

function registerListeners() {
  addProjectBtn.addEventListener('click', clickAddProjectBtn);
  projectSelectElem.addEventListener('change', changeSelectedProject);
}

export default registerListeners;