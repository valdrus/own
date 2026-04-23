import { FormField } from "../FormField";
import { Button } from "../Button";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { queryClient } from "../../api/qureyClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginForm.css";

const LoginFormSchema = z.object({
  email: z.email().min(5, 'Не менее 5-ти символов'),
  password: z.string().min(8, 'Не менее 8-ми символов!')
})

type LoginFormData = z.infer<typeof LoginFormSchema>

export const LoginForm: FC = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema)
  })

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginFormData) => login(email, password),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] })          // инвалидация, при успешном запросе функция с ключами указанными в скобках бдует вызвана снова
    }
  }, queryClient)

  return (
    <form className="login-form" onSubmit={handleSubmit((data) => { loginMutation.mutate(data) })}>

      <FormField label="Email" errorMessage={errors.email?.message}>
        <input type="email" {...register('email')} />
      </FormField>

      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register('password')} />
      </FormField>

      <Button type="submit" title="Войти" isLoading={loginMutation.isPending}>Войти</Button>

    </form>
  );
};
