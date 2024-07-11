import React, { useState } from "react";
import { TextField, Button, Typography, Alert } from "@mui/material";
import { validateLogin, validatePassword } from "../utils/validate";
import { login, register } from "../services/authService";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (token: string, login: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [loginInput, setLogin] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const loginValid = validateLogin(loginInput);
    const passwordValid = validatePassword(passwordInput);

    if (!loginValid || !passwordValid) {
      setError(
        "Некорректные данные. Логин должен содержать от 3 до 20 символов. Пароль должжен быть от 6 символов"
      );
      return;
    }

    try {
      const token =
        type === "login"
          ? await login(loginInput, passwordInput)
          : await register(loginInput, passwordInput);
      onSubmit(token, loginInput);
    } catch (error) {
      console.error("Ошибка авторизации", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <Typography variant="h4" gutterBottom className="mb-4">
        {type === "login" ? "Вход" : "Регистрация"}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Логин"
        value={loginInput}
        onChange={(e) => setLogin(e.target.value)}
        fullWidth
        margin="normal"
        required
        className="mb-4"
      />
      <TextField
        label="Пароль"
        type={showPassword ? "text" : "password"}
        value={passwordInput}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
        className="mb-4"
      />
      <Button onClick={togglePasswordVisibility} className="mb-4">
        {showPassword ? "Скрыть пароль" : "Показать пароль"}
      </Button>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {type === "login" ? "Войти" : "Зарегистрироваться"}
      </Button>
    </form>
  );
};

export default AuthForm;
