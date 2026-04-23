import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/auth";
import { queryClient } from "../../api/qureyClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterFormSchema = z.object({
  username: z.string().min(5, 'Не менее 5-ти символов'),
  email: z.email(),
  password: z.string().min(8, 'Не менее 8-ми символов!'),
})

type RegisterFormData = z.infer<typeof RegisterFormSchema>

export const RegisterForm: FC = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema)
  })

  const registrationMutation = useMutation({
    mutationFn: ({ username, email, password }: RegisterFormData) => registerUser(username, email, password)
  }, queryClient)

  return (
    <form className="register-form" onSubmit={handleSubmit((data) => { registrationMutation.mutate(data) })}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input type="text" {...register('username')} />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input type="text" {...register('email')} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register('password')} />
      </FormField>

      <Button type="submit" title="Войти" isLoading={registrationMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
