import {  getSelectedProjectId } from "../logic/mainLogic.js";
import { projectSelectElem, sessionHistoryElem, deleteProjectBtn } from "../dom/mainDOM.js";
import { formatTime } from "../utils.js";

export function displayProjects(projects) {
  projectSelectElem.innerHTML = ''; // Clear all child project <option>

  if (projects.length === 0)
    deleteProjectBtn.classList.add('disable-delete-project-btn');

  else
    deleteProjectBtn.classList.remove('disable-delete-project-btn');

  console.log(projects)
  projects.forEach((project, index) => {
    const optionElem = document.createElement('option');
    
    optionElem.value = project.title;
    optionElem.textContent = `Project ${index + 1}: ${project.title}`;
    optionElem.dataset.projectId = project._id;

    projectSelectElem.appendChild(optionElem);
  });
  
  // maybe sanitize localStorage input first
  projectSelectElem.selectedIndex = localStorage.getItem('selectedProjectIndex') || 0;
}

export function displaySessions(sessions) {
  sessionHistoryElem.innerHTML = '';
  const projectIdRes = getSelectedProjectId();
  if (!projectIdRes.ok) return projectIdRes;

  const projectId = projectIdRes.projectId;

  const filteredSessions = sessions.filter(session => session.projectId === projectId);

  if (filteredSessions.length === 0) {
    sessionHistoryElem.innerHTML = '<div id="history-info">New sessions will be added here.</div>';
    return { ok: true };
  }

  filteredSessions.forEach((session, index) => {
    if (session.projectId !== projectId) {
      return;
    }
    const sessionElem = document.createElement('div');
    sessionElem.id = 'session';

    let statusText;

    switch (session.status) {
      case 'ended':
        statusText = `Completed: ${formatTime(Math.floor(session.duration))} Minutes`;
        break;
      
      case 'active':
        statusText = 'Ongoing';
        break;
      
      case 'paused':
        statusText = 'Paused';
        break;
      
      default:
        statusText = 'Unknown';
        break;
    }
    
    sessionElem.textContent = `Session ${index + 1}: ${statusText}`;
    
    sessionHistoryElem.appendChild(sessionElem);
  });

  return { ok: true };
}

let errorTimeoutId;

export function showError(message) {
  const container = document.querySelector('#error-container');
  
  clearTimeout(errorTimeoutId);
  container.innerHTML = '';  // Clear all errors.

  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;

  container.appendChild(error);

  errorTimeoutId = setTimeout(() => error.remove(), 5000);
}