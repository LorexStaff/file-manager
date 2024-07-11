import React, { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const { user, login, register } = useAuth();
  const [currentForm, setCurrentForm] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (token: string, loginInput: string) => {
    login(token, loginInput);
    navigate("/dashboard");
  };

  const handleRegister = async (token: string, loginInput: string) => {
    register(token, loginInput);
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        marginTop: "120px",
        width: "40%",
      }}
    >
      {currentForm === "login" ? (
        <AuthForm type="login" onSubmit={handleLogin} />
      ) : (
        <AuthForm type="register" onSubmit={handleRegister} />
      )}
      <button
        onClick={() =>
          setCurrentForm(currentForm === "login" ? "register" : "login")
        }
      >
        {currentForm === "login" ? "Зарегистрироваться" : "Войти"}
      </button>
    </div>
  );
};

export default AuthPage;
