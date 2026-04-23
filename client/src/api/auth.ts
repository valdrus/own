import { FetchNoteListResponse, FetchNoteListSchema, UserSchema, User } from "./types";

export function registerUser(username: string, email: string, password: string): Promise<void> {  // регистрация
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password })
  }).then(validateResponse).then(() => undefined)
}

export function login(email: string, password: string): Promise<void> {          // авторизация
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(validateResponse).then(() => undefined)
}

async function validateResponse(response: Response): Promise<Response> {         // валидация
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response
}

export function fetchNoteList(): Promise<FetchNoteListResponse> {               // список заметок
  return fetch('/api/notes')
    .then((response) => response.json())                                        
    .then((data) => FetchNoteListSchema.parse(data))                            
}

export function fetchUser(id: string): Promise<User> {                          // пользователь
  return fetch(`/api/users/${id}`)
    .then((response) => response.json())
    .then(validateResponse)
    .then((data) => UserSchema.parse(data))
}

export function createNote(title: string, text: string): Promise<void> {                      // создание заметки
  return fetch('/api/notes', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, text })
  }).then(validateResponse).then(() => undefined)
}

export function fetchMe(): Promise<User> {                                     // запрос пользователя
  return fetch('/api/users/me')
    .then(validateResponse)
    .then(response => response.json())
    .then(data => UserSchema.parse(data))
}