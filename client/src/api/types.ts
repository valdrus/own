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

export const CreateNoteSchem = z.object({
  title: z.string(),
  text: z.string().min(10, 'Минимальная длинна 10 символов')
})

export const NoteList = z.array(NoteSchema)                // Создание схемы валиадции для массива, говорим что элементы массива должны быть шаблона объекта PostSchema

export const FetchNoteListSchema = z.object({               // Создание схемы валидации, потому что мы знаем что сервер вернет нам список list с массивом внутри
  list: NoteList,
})

//-----------------------------------------------------------------------------------------Извлечение типов из схем------------------------------------------------------------------------------------

export type Note = z.infer<typeof NoteSchema>

export type NoteList = z.infer<typeof NoteList>

export type FetchNoteListResponse = z.infer<typeof FetchNoteListSchema>

export type User = z.infer<typeof UserSchema>

export type CreateNoteForm = z.infer<typeof CreateNoteSchem>
