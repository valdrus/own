import { FetchNoteListResponse, FetchNoteListSchema, UserSchema, User } from "./types";

export function registerUser(username: string, email: string, password: string): Promise<void> {  // регистрация
  return fetch('http://localhost:4000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password })
  }).then(validateResponse).then(() => undefined)
}

export function login(email: string, password: string): Promise<void> {          // авторизация
  return fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
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
  return fetch('http://localhost:4000/notes')
    .then((response) => response.json())
    .then((data) => FetchNoteListSchema.parse(data))
}

export function fetchUser(id: string): Promise<User> {                          // пользователь
  return fetch(`http://localhost:4000/users/${id}`)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data))
}

export function fetchLogOut(): Promise<void> {                                 // выход
  return fetch('http://localhost:4000/logout')
    .then((response) => response.json())
}

export function createNote(text: string): Promise<void> {                      // создание заметки
  return fetch('http://localhost:4000/notes', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text })
  }).then(validateResponse).then(() => undefined)
}

export function fetchMe(): Promise<User> {                                     // запрос пользователя
  return fetch('http://localhost:4000/users/me')
    .then(validateResponse)
    .then(response => response.json())
    .then(data => UserSchema.parse(data))
}