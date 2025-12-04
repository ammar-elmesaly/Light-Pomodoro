class Sessions {
  #sessions; // Global sessions array

  constructor() {
    this.#sessions = []
  }

  setSessions(sessions) {
    this.#sessions = sessions;
  }

  getSessions() {
    return this.#sessions;
  }
}

export const SESSIONS = new Sessions();