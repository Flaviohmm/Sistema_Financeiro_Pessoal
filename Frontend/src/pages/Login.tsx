import { useState } from "react";
import { api } from "../services/api";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            window.location.href = "/";
        } catch {
            setError("Credenciais inválidas");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800">
            <div className="bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">

                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Entrar
                </h2>

                {error && (
                    <p className="text-red-400 text-sm text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={e => setForm({ ...form, password: e.target.value })}
                    />

                    <button className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg text-white font-semibold">
                        Entrar
                    </button>
                </form>

                <p className="text-gray-400 text-sm text-center mt-4">
                    Não tem conta?{" "}
                    <a href="/register" className="text-blue-400 hover:underline">
                        Criar conta
                    </a>
                </p>
            </div>
        </div>
    );
}
