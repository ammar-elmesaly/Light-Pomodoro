export interface CreateProjectInput {
    title: string
}

export interface StartSessionInput {
    projectId: string;
    plannedDuration: number;
}

export interface EndSessionInput {
    sessionId: string;
}

export interface PauseSessionInput {
    sessionId: string;
}

export interface DeleteProjectInput {
    projectId: string;
}

export interface DeleteHistoryInput {
    projectId: string;
}
