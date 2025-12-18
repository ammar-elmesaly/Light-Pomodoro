# Light Pomodoro API Reference

Base URL (local development):

```txt
http://localhost:3000/api
```

All endpoints expect and return JSON.

---

## Endpoints

### Retrieve Sessions

#### 1. Get Paused Session

**GET** `/sessions/paused`

Retrieve the current paused session.

**Response:**

```json
{
  "success": true,
  "_id": "string",
  "projectId": "string",
  "plannedDuration": 1500000,
  "status": "paused",
  "startTime": "2025-12-17T21:30:23.163Z",
  "pauses": [
    {
      "start": "2025-12-17T21:43:30.746Z",
      "end": "2025-12-17T21:44:24.348Z",
      "_id": "string"
    },
  ],
  "__v": 0
}
```

**Error Example:**

```json
{
  "success": false,
  "error": "No paused session found."
}
```

---

#### 2. Get Active Session

**GET** `/sessions/active`

Retrieve the current active session.

**Response:**

```json
{
  "success": true,
  "_id": "string",
  "projectId": "string",
  "plannedDuration": 1500000,
  "status": "active",
  "startTime": "2025-12-17T21:30:23.163Z",
  "pauses": [
    {
      "start": "2025-12-17T21:43:30.746Z",
      "end": "2025-12-17T21:44:24.348Z",
      "_id": "string"
    },
    {
      "start": "2025-12-17T21:44:48.363Z",
      "end": "2025-12-17T21:53:08.917Z",
      "_id": "string"
    }
  ],
  "__v": 0
}
```

**Error Example:**

```json
{
  "success": false,
  "error": "No active session found."
}
```

---

#### 3. Get Active or Paused Session

**GET** `/sessions/active_or_paused`

Retrieve any active or paused sessions.

**Response:**

```json
{
  "success": true,
  "_id": "string",
  "projectId": "string",
  "plannedDuration": 1500000,
  "status": "paused",
  "startTime": "2025-12-17T21:30:23.163Z",
  "pauses": [
    {
      "start": "2025-12-17T21:43:30.746Z",
      "end": "2025-12-17T21:44:24.348Z",
      "_id": "string"
    },
  ],
  "__v": 0
}
```

**Error Example:**

```json
{
  "success": false,
  "error": "No active or paused session found."
}
```

---

#### 4. Get All Sessions

**GET** `/sessions`

Retrieve all past sessions.

**Response:**

```json
{
    "success": true,
    "sessions": [{
        "_id": "string",
        "projectId": "string",
        "status": "ended",
        "startTime": "2025-12-03T11:18:56.838Z",
        "pauses": [],
        "__v": 0,
        "endTime": "2025-12-03T11:30:00.641Z",
        "duration": 663890
    },
    {
        "_id": "string",
        "projectId": "string",
        "status": "ended",
        "startTime": "2025-12-03T11:40:59.446Z",
        "pauses": [],
        "__v": 0,
        "endTime": "2025-12-03T11:41:05.403Z",
        "duration": 6032
    }]
}
```

---

### Manage Sessions

#### 1. Start a Session

**POST** `/sessions/start`

Start a new pomodoro session.

**Request Body:**

```json
{
  "projectId": "string",
  "plannedDuration": 1500000  // 25 minutes
}
```

**Response:**

```json
{
    "success": true,
    "projectId":"string",
    "plannedDuration":1500000,
    "status":"active",
    "_id":"string",
    "startTime":"2025-12-17T20:56:00.439Z",
    "pauses":[],
    "__v":0
}
```

**Error Example:**

```json
{
  "success": false,
  "error": "Cannot start two active sessions at the same time."
}
```

---

#### 2. End a Session

**POST** `/sessions/end`

Stop an active session.

**Request Body:**

```json
{
  "sessionId": "string"
}
```

**Response:**

```json
{
  "success": true,
  "_id": "string",
  "projectId": "string",
  "plannedDuration": 1500000,
  "duration": 44972,
  "status": "ended",
  "startTime": "2025-12-17T21:29:23.390Z",
  "endTime": "2025-12-17T21:30:08.362Z",
  "pauses": [],
  "__v": 0
}
```

**Error Example:**

```json
{
  "success": false,
  "error": "Session is not found or ended"
}
```

---

#### 3. Pause a Session

**POST** `/sessions/pause`

Pause an active session.

**Request Body:**

```json
{
  "sessionId": "string"
}
```

**Response:**

```json  
{
  "success": true,
  "_id": "string",
  "projectId": "string",
  "plannedDuration": 1500000,
  "status": "paused",
  "startTime": "2025-12-17T21:30:23.163Z",
  "pauses": [
    {
      "start": "2025-12-17T21:43:30.746Z",
      "end": "2025-12-17T21:44:24.348Z",
      "_id": "string"
    },
  ],
  "__v": 0
}
```

**Error Example:**

```json
{
  "success": false,
  "error": "Session not found or not active"
}
```

---

#### 4. Resume a Session

**POST** `/sessions/resume`

Resume a paused session.

**Request Body:**

```json
{
  "sessionId": "string"
}
```

**Response:**

```json
{
  "success": true,
  "_id": "string",
  "projectId": "string",
  "plannedDuration": 900000,
  "status": "active",
  "startTime": "2025-12-18T18:06:28.979Z",
  "pauses": [
    {
      "start": "2025-12-18T18:06:52.505Z",
      "end": "2025-12-18T18:07:25.200Z",
      "_id": "string"
    }
  ],
  "__v": 0
}
```

**Error Example:**

```json
{
  "success": false,
  "error": "Session not found or not paused"
}
```

---

#### 4. Clear Session History

**DELETE** `/sessions/delete/history`

Clear all session history for a specific project.

**Request:**

```json
{
    "projectId": "string"
}
```

**Response:**

```json
{
    "success":true,
    "acknowledged":true,
    "deletedCount":7
}
```

---

### Retrieve Projects

#### 4. Get All Projects

**GET** `/projects`

Retrieve all projects.

**Response:**

```json
{
  "success": true,
  "projects": [
    {
      "_id": "string",
      "title": "Wash the dishes",
      "date": "2025-12-08T20:32:23.170Z",
      "__v": 0
    },
    {
      "_id": "string",
      "title": "Hello World",
      "date": "2025-12-17T18:55:50.322Z",
      "__v": 0
    }
  ]
}
```

---

### Manage Projects

#### 1. Add a Project

**POST** `/projects/add`

Add a new project (name must be unique).

**Request Body:**

```json
{
  "title": "Example Project Title"
}
```

**Response:**

```json
{
  "success": true,
  "title": "Example Project Title",
  "_id": "string",
  "date": "2025-12-18T18:24:26.617Z",
  "__v": 0
}
```

**Error Example:**

```json
{
  "success": false,
  "error": "Project already exists"
}
```

---

#### 2. Delete a Project

**DELETE** `/projects/delete`

Deletes a project.

**Request Body:**

```json
{
  "projectId": "string"
}
```

**Response:**

```json
{
  "success": true,
  "_id": "string",
  "title": "Example Project Title",
  "date": "2025-12-18T18:24:26.617Z",
  "__v": 0
}
```

**Error Example:**

```json
{
  "success": false,
  "error": "Cannot delete a project containing an active session."
}
```

---

### Notes

* Time durations are in **milliseconds**.
* All timestamps are in **ISO 8601 UTC** format.
* Errors always return a JSON object with the `success: false` key and an `error` message.
