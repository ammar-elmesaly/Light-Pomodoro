export async function addProject(projectTitle) {
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
    return { ok: false, error: 'Error: ' + data.error};
  }

  const project = await res.json();
  return { ok: true, project }; 
}

export async function getProjects() {
  const res = await fetch('http://localhost:3000/api/projects');

  if (!res.ok) {
    const data = await res.json();
    return { ok: false, error: 'Error: ' + data.error};
  }

  const projects = await res.json();
  return { ok: true, projects }; 
}