export interface ProjectBody {
    title: string
}

export interface SessionBody {
    projectId: string
}

export interface EndSessionBody {
    sessionId: string,
    endTime: Date
}