const projectSelectElem = document.querySelector('#project-select');

async function getProjects() {
  const res = await fetch('http://localhost:3000/api/projects');
  const projects = res.json();
  return projects;
}

async function displayProjects() {
  // const projects = await getProjects();
  const projects = [
    {
      id: 12,
      title: "Finish Homework"
    },

    {
      id: 24,
      title: "Wash the dishes"
    }
  ];

  projects.forEach((project, index) => {
    const optionElem = document.createElement('option');
    
    optionElem.value = project.title;
    optionElem.textContent = `Project ${index + 1}: ${project.title}`;

    projectSelectElem.appendChild(optionElem);
  });
}

displayProjects();