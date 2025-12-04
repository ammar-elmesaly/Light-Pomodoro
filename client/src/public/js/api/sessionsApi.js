// @ts-check

import { getSelectedProjectId } from "../logic/mainLogic.js";
import { SESSIONS } from "../state/sessionState.js";

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
    return { ok: false, error: 'Error: ' + data.error};
  }

  const session = await res.json();
  return { ok: true, session };
}

export async function endSession(sessionId) {
  const res = await fetch('http://localhost:3000/api/sessions/end', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sessionId
    })
  });

  if (!res.ok) {
    const data = await res.json();
    return { ok: false, error: 'Error: ' + data.error};
  }

  const session = await res.json();
  return { ok: true, session };
}

export async function pauseSession(sessionId) {
  const res = await fetch('http://localhost:3000/api/sessions/pause', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sessionId
    })
  });

  if (!res.ok) {
    const data = await res.json();
    return { ok: false, error: 'Error: ' + data.error};
  }


  const session = await res.json();
  return { ok: true, session };
}

export async function resumeSession(sessionId) {
  const res = await fetch('http://localhost:3000/api/sessions/resume', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sessionId
    })
  });

  if (!res.ok) {
    const data = await res.json();
    return { ok: false, error: 'Error: ' + data.error};
  }

  const session = await res.json();
  return { ok: true, session };
}

export async function getSessions() {
  const res = await fetch('http://localhost:3000/api/sessions');

  if (!res.ok) {
    const data = await res.json();
    return { ok: false, error: 'Error: ' + data.error};
  }

  const sessions = await res.json();
  return { ok: true, sessions };
}

export async function getActiveSession() {
  const res = await fetch('http://localhost:3000/api/sessions/active');

  if (!res.ok) {
    const data = await res.json();
    return { ok: false, error: 'Error: ' + data.error};
  }


  const session = await res.json();
  return { ok: true, session };
}

export async function getPausedSession() {
  const res = await fetch('http://localhost:3000/api/sessions/paused');

  if (!res.ok) {
    const data = await res.json();
    return { ok: false, error: 'Error: ' + data.error};
  }

  const session = await res.json();
  return { ok: true, session: session };
}

export async function updateSessions() {
  let res = await getSessions();
  if (!res.ok) return res;

  const sessions = await res.sessions;
  
  SESSIONS.setSessions(sessions);  // sessions are saved in memory
  return { ok: true }
}