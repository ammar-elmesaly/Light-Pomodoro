import {  getSelectedProjectId } from "../logic/mainLogic.js";
import { projectSelectElem, sessionHistoryElem } from "../dom/mainDOM.js";
import { formatTime } from "../utils.js";

export function displayProjects(projects) {
  projectSelectElem.innerHTML = ''; // Clear all child project <option>

  console.log(projects);
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
  
  const filteredSessions = sessions.filter(session => session.projectId === getSelectedProjectId());

  if (filteredSessions.length === 0) {
    sessionHistoryElem.textContent = 'New sessions will be added here.';
    return;
  }

  filteredSessions.forEach((session, index) => {
    if (session.projectId !== getSelectedProjectId()) {
      return;
    }
    const sessionElem = document.createElement('div');
    sessionElem.id = 'session';

    let statusText;

    switch (session.status) {
      case 'ended':
        statusText = `Completed: ${formatTime(Math.floor(session.duration / 1000))} Minutes`;
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