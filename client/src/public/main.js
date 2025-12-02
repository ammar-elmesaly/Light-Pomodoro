import { formatTime } from "./timer.js";

const projectSelectElem = document.querySelector('#project-select');
const addProjectBtn = document.querySelector('#add-project-btn');
const projectTitleInput = document.querySelector('#new-project-title');
const sessionHistoryElem = document.querySelector('#session-history');

let SESSIONS = [];  // Global session array

addProjectBtn.addEventListener('click', () => {
  const title = getProjectTitle();
  addProject(title);
});

projectSelectElem.addEventListener('change', () => {
  localStorage.setItem('selectedProjectIndex', projectSelectElem.selectedIndex);
  displaySessions(false);  // Don't fetch sessions from server
})

function getProjectTitle() {
  const title = projectTitleInput.value;
  return title;
}

async function addProject(projectTitle) {
  const res = await fetch('http://localhost:3000/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: projectTitle
    })
  });

  if (!res.ok) {
    const data = await res.json();
    showError('Error: ' + data.error); 
    return;
  }

  displayProjects();
}

async function getProjects() {
  const res = await fetch('http://localhost:3000/api/projects');

  if (!res.ok) {
    const data = await res.json();
    showError('Error: ' + data.error); 
    return;
  }

  const projects = res.json();
  return projects;
}

async function displayProjects() {
  const projects = await getProjects();
  
  projectSelectElem.innerHTML = ''; // Clear all child project <option>

  projects.forEach((project, index) => {
    const optionElem = document.createElement('option');
    
    optionElem.value = project.title;
    optionElem.textContent = `Project ${index + 1}: ${project.title}`;
    optionElem.dataset.projectId = project._id;

    projectSelectElem.appendChild(optionElem);
  });
  
  projectSelectElem.selectedIndex = localStorage.getItem('selectedProjectIndex') || 0;
}

function getSelectedProjectId() {
  const index = projectSelectElem.selectedIndex;
  const projectId = projectSelectElem.options[index].dataset.projectId;
  return projectId;
}

export async function addSession() {
  const projectId = getSelectedProjectId();

  const res = await fetch('http://localhost:3000/api/sessions/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      projectId
    })
  });

  if (!res.ok) {
    const data = await res.json();
    showError('Error: ' + data.error); 
    return;
  }

  displaySessions();
}

export async function endSession(sessionId) {
  const res = await fetch('http://localhost:3000/api/sessions/end', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sessionId,
      endTime: Date.now()
    })
  });

  if (!res.ok) {
    const data = await res.json();
    showError('Error: ' + data.error); 
    return;
  }

  displaySessions();
}

export async function getSessions() {
  const res = await fetch('http://localhost:3000/api/sessions');

  if (!res.ok) {
    const data = await res.json();
    showError('Error: ' + data.error); 
    return;
  }

  const sessions = res.json();
  return sessions;
}

export async function updateSessions() {
  SESSIONS = await getSessions();  // sessions are saved in memory
}

async function displaySessions(update = true) {
  // when displaying sessions, they are updated from the server unless specified
  if (update)
    await updateSessions();

  sessionHistoryElem.innerHTML = '';

  const filteredSessions = SESSIONS.filter(session => session.projectId === getSelectedProjectId());

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
    
    const duration = session.duration
    ? formatTime(Math.floor(session.duration / 1000))
    : null;

    sessionElem.textContent = `Session ${index + 1}: ${duration ? duration + ' Minutes' : 'ongoing'}`;
    
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

displayProjects();
displaySessions();