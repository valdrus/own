import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { FC, FormEventHandler, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/auth";
import { queryClient } from "../../api/qureyClient";

export const RegisterForm: FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registrationMutation = useMutation({
    mutationFn: () => registerUser(username, email, password)
  }, queryClient)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    registrationMutation.mutate()
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <FormField label="Имя">
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
      </FormField>
      <FormField label="Email">
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </FormField>
      <FormField label="Пароль">
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </FormField>

      {registrationMutation.error && <span>{registrationMutation.error.message}</span>}

      <Button type="submit" title="Войти" isLoading={registrationMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
