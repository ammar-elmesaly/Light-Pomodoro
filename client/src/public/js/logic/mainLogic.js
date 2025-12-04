import { projectTitleInput, projectSelectElem } from "../dom/mainDOM.js";

export function getSelectedProjectId() {
  const index = projectSelectElem.selectedIndex;
  const projectId = projectSelectElem.options[index].dataset.projectId;
  return projectId;
}

export function getProjectTitle() {
  const title = projectTitleInput.value;
  return title;
}