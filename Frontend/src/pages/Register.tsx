import React, { useState } from "react";
import { api } from "../services/api";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", form);
            setMessage("Conta criada com sucesso!");
        } catch {
            setMessage("Erro ao criar conta");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800">
            <div className="bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">

                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Criar Conta
                </h2>

                {message && (
                    <p className="text-green-400 text-sm text-center mb-4">{message}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Nome"
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
                        onChange={e => setForm({ ...form, password: e.target.value })}
                    />

                    <button className="w-full bg-green-600 hover:bg-green-700 transition py-2 rounded-lg text-white font-semibold">
                        Criar Conta
                    </button>
                </form>

                <p className="text-gray-400 text-sm text-center mt-4">
                    Já tem conta?{" "}
                    <a href="/login" className="text-blue-400 hover:underline">
                        Entrar
                    </a>
                </p>
            </div>
        </div>
    );
}
