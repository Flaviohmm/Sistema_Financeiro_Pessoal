import React, { useState } from "react";
import { api } from "../services/api";

export default function TransactionForm() {
    const [form, setForm] = useState({
        description: "",
        amount: 0,
        type: "INCOME",
        category: "",
        date: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await api.post("/transactions", form);
        location.reload();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input className="input" placeholder="Descrição"
                onChange={e => setForm({...form, description: e.target.value})} />

            <input className="input" type="number"
                onChange={e => setForm({...form, amount: Number(e.target.value)})} />

            <button className="bg-green-500 px-4 py-2 rounded">
                Criar
            </button>
        </form>
    );
}