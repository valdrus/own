import { FormField } from "../FormField";
import { Button } from "../Button";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../api/auth";
import { queryClient } from "../../api/qureyClient";
import { useForm } from "react-hook-form";
import { CreateNoteForm, CreateNoteSchem } from "../../api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import "./NoteForm.css";

interface NoteFormProps { }


export const NoteForm: FC<NoteFormProps> = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<CreateNoteForm>({
    resolver: zodResolver(CreateNoteSchem)
  })

  const createNoteMutation = useMutation({
    mutationFn: ({ title, text }: CreateNoteForm) => createNote(title, text),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  }, queryClient)

  return (
    <form className="note-form" onSubmit={handleSubmit((data) => {
      createNoteMutation.mutate(data)
    })}>
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input type="text" {...register('title')} />
      </FormField>

      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register('text')} />
      </FormField>

      <Button type="submit" title="Опубликовать" isLoading={createNoteMutation.isPending}>Сохранить</Button>
    </form>
  );
};
