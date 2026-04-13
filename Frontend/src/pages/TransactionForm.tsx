import React, { useState } from "react";
import { api } from "../services/api";

type TransactionType = "INCOME" | "EXPENSE";

export default function TransactionForm() {
    const [form, setForm] = useState({
        description: "",
        amount: 0,
        type: "INCOME" as TransactionType,
        category: "",
        date: ""
    });

    const handleChange = (field: string, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await api.post("/transactions", {
            ...form,
            amount: Number(form.amount),
        });

        window.location.reload();
    };

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6 text-white">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-lg p-6 space-y-5"
            >
                <h2 className="text-2xl font-bold">Nova Transação</h2>

                {/* Descrição */}
                <div>
                    <label className="text-sm text-gray-400">Descrição</label>
                    <input
                        className="w-full mt-1 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Ex: Salário, Mercado..."
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                </div>

                {/* Valor */}
                <div>
                    <label className="text-sm text-gray-400">Valor</label>
                    <input
                        type="number"
                        className="w-full mt-1 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="R$ 0.00"
                        onChange={(e) => handleChange("amount", e.target.value)}
                    />
                </div>

                {/* Tipo */}
                <div>
                    <label className="text-sm text-gray-400">Tipo</label>
                    <select
                        className="w-full mt-1 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={form.type}
                        onChange={(e) =>
                            handleChange("type", e.target.value as TransactionType)
                        }
                    >
                        <option value="INCOME">Receita</option>
                        <option value="EXPENSE">Despesa</option>
                    </select>
                </div>

                {/* Categoria */}
                <div>
                    <label className="text-sm text-gray-400">Categoria</label>
                    <select
                        className="w-full mt-1 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => handleChange("category", e.target.value)}
                    >
                        <option value="">Selecione</option>
                        <option value="SALARY">Salário</option>
                        <option value="FOOD">Alimentação</option>
                        <option value="RENT">Aluguel</option>
                        <option value="TRANSPORT">Transporte</option>
                        <option value="ENTERTAINMENT">Lazer</option>
                        <option value="OTHER">Outros</option>
                    </select>
                </div>

                {/* Data */}
                <div>
                    <label className="text-sm text-gray-400">Data</label>
                    <input
                        type="date"
                        className="w-full mt-1 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => handleChange("date", e.target.value)}
                    />
                </div>

                {/* Botão */}
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 transition p-3 rounded-lg font-semibold"
                >
                    Criar Transação
                </button>
            </form>
        </div>
    );
}