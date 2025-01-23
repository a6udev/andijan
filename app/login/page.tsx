"use client"
import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://baxt.prolabagency.com/api/v1/accounts/login/", formData);
      alert("Успешный вход!");
      console.log("User Token:", response.data.token);
      localStorage.setItem("token", response.data.token);
      window.location.href="/orders"

    } catch (error: any) {
      setError(error.response?.data?.detail || "Произошла ошибка");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Вы какой официант или кассир?</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Телефон номер</label>
            <input
              type="tel"
              name="login"
              value={formData.login}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
