import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { FC, useState, FormEventHandler } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { queryClient } from "../../api/qureyClient";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] })          // инвалидация, при успешном запросе функция с ключами указанными в скобках бдует вызвана снова
    }
  }, queryClient)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    loginMutation.mutate()
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>

      <FormField label="Email">
        <input type="text" name="email" onChange={(event) => setEmail(event.target.value)} value={email} />
      </FormField>

      <FormField label="Пароль">
        <input type="password" name="password" onChange={(event) => setPassword(event.target.value)} value={password} />
      </FormField>

      {loginMutation.error && <span>{loginMutation.error.message}</span>}

      <Button type="submit" title="Войти" isLoading={loginMutation.isPending}>Войти</Button>

    </form>
  );
};
