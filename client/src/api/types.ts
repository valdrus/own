import { z } from 'zod'

//---------------------------------------------------------------------------------------Создание схем для авлидации-------------------------------------------------------------------------------------

export const NoteSchema = z.object({                        // Создание схемы валидации для объекта заметки
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number(),
})

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  username: z.string(),
})

export const RegisterFormSchema = z.object({
  username: z.string().min(5, 'Длинна должна быть не менее 5 символов'),
  email: z.email(),
  password: z.string().min(8, 'Длинна должна быть не менее 8 символов')
})

export const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Длинна должна быть не менее 8 символов')
})

export const NoteList = z.array(NoteSchema)                // Создание схемы валиадции для массива, говорим что элементы массива должны быть шаблона объекта PostSchema

export const FetchNoteListSchema = z.object({               // Создание схемы валидации, потому что мы знаем что сервер вернет нам список list с массивом внутри
  list: NoteList
})

//-----------------------------------------------------------------------------------------Извлеченгие типов из схем------------------------------------------------------------------------------------

export type Note = z.infer<typeof NoteSchema>

export type NoteList = z.infer<typeof NoteList>

export type FetchNoteListResponse = z.infer<typeof FetchNoteListSchema>

export type User = z.infer<typeof UserSchema>
