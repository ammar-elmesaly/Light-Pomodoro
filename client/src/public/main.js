import { formatTime } from "./timer.js";

const projectSelectElem = document.querySelector('#project-select');
const addProjectBtn = document.querySelector('#add-project-btn');
const projectTitleInput = document.querySelector('#new-project-title');
const sessionHistoryElem = document.querySelector('#session-history');

addProjectBtn.addEventListener('click', () => {
  const title = getProjectTitle();
  addProject(title);
});

projectSelectElem.addEventListener('change', () => {
  alert(projectSelectElem.value);
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

  projectSelectElem.lastElementChild.selected = true;
}

export async function addSession() {
  const index = projectSelectElem.selectedIndex;
  const projectId = projectSelectElem.options[index].dataset.projectId;

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

async function displaySessions() {
  // Session 1: 25:00 Minutes
  const sessions = await getSessions();
  
  if (sessions.length === 0) {
    sessionHistoryElem.textContent = 'New sessions will be added here.';
    return;
  }

  sessionHistoryElem.innerHTML = '';

  sessions.forEach((session, index) => {
    const sessionElem = document.createElement('div');
    sessionElem.id = 'session';
    sessionElem.textContent = `Session ${index + 1}: ${session.duration ? formatTime(session.duration) : 'ongoing'}`;
    
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