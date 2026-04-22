import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { FC, FormEventHandler, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../api/auth";
import { queryClient } from "../../api/qureyClient";

interface NoteFormProps {

}

export const NoteForm: FC<NoteFormProps> = () => {
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')

  const createNoteMutation = useMutation({
    mutationFn: () => createNote(title, text)
  }, queryClient)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    createNoteMutation.mutate()
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <FormField label="Заголовок">
        <input type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
      </FormField>
      <FormField label="Текст">
        <textarea value={text} onChange={(e) => setText(e.currentTarget.value)} />
      </FormField>
      <Button type="submit" title="Опубликовать" isLoading={createNoteMutation.isPending}>Сохранить</Button>
    </form>
  );
};
