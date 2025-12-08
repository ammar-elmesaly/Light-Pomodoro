import { projectTitleInput, projectSelectElem } from "../dom/mainDOM.js";

export function getSelectedProjectId() {
  const index = projectSelectElem.selectedIndex;
  if (index === -1)
    return { ok: false, error: 'Error: No selected project (probably you don\'t have any project).' };

  const projectId = projectSelectElem.options[index].dataset.projectId;
  return { ok: true, projectId };
}

export function getProjectTitle() {
  const title = projectTitleInput.value;
  return title;
}