const projectSelectElem = document.querySelector('#project-select');
const addProjectBtn = document.querySelector('#add-project-btn');
const projectTitleInput = document.querySelector('#new-project-title');

addProjectBtn.addEventListener('click', async () => {
  const title = getProjectTitle();
  await addProject(title);
  displayProjects();
});

projectSelectElem.addEventListener('change', () => {
  console.log(projectSelectElem.value);
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
}

async function getProjects() {
  const res = await fetch('http://localhost:3000/api/projects');
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

    projectSelectElem.appendChild(optionElem);
  });
}

displayProjects();