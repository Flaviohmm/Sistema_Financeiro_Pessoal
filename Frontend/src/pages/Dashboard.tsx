import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Transaction } from "../types/transaction";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

export default function Dashboard() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        api.get("/transactions").then((res) => {
            setTransactions(res.data);
        });
    }, []);

    const formatCurrency = (value: number) => {
        return value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + " R$";
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("pt-BR");
    };

    const income = transactions
        .filter(t => t.type === "INCOME")
        .reduce((acc, t) => acc + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === "EXPENSE")
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = income - expenses;

    const groupedData = transactions.reduce((acc: any, t) => {
        const month = new Date(t.date).toLocaleString("pt-BR", { month: "short" });

        if (!acc[month]) {
            acc[month] = { name: month, Receitas: 0, Despesas: 0 };
        }

        if (t.type === "INCOME") acc[month].Receitas += t.amount;
        else acc[month].Despesas += t.amount;

        return acc;
    }, {});

    const chartData = Object.values(groupedData);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="p-6 space-y-6 bg-gray-900 min-h-screen text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <a href="/transaction" className="bg-amber-600 text-amber-100 px-4 py-2 rounded-2xl">
                    + Transação
                </a>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white"
                >
                    Sair
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Card title="Saldo" value={balance} />
                <Card title="Receitas" value={income} />
                <Card title="Despesas" value={expenses} />
            </div>

            <table className="w-full mt-6 bg-gray-800 rounded-xl overflow-hidden">
                <thead>
                    <tr className="text-left border-b border-gray-700">
                        <th className="p-3">Descrição</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(t => (
                        <tr key={t.id} className="border-b border-gray-700">
                            <td className="p-3">{t.description}</td>
                            <td
                                className={
                                    t.type === "INCOME"
                                        ? "text-green-400 font-semibold"
                                        : "text-red-400 font-semibold"
                                }
                            >
                                {formatCurrency(t.amount)}
                            </td>
                            <td>
                                <span
                                    className={
                                        t.type === "INCOME"
                                            ? "bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-sm"
                                            : "bg-red-500/20 text-red-400 px-2 py-1 rounded-lg text-sm"
                                    }
                                >
                                    {t.type === "INCOME" ? "Receita" : "Despesa"}
                                </span>
                            </td>
                            <td>{t.category}</td>
                            <td>{formatDate(t.date)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>



            <div className="bg-gray-800 p-6 rounded-xl shadow mt-5">
                <h2 className="text-xl font-semibold mb-4">Visão Financeira</h2>

                <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="Receitas" fill="#22c55e" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="Despesas" fill="#ef4444" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function Card({ title, value }: { title: string; value: number }) {
    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-gray-400">{title}</h2>
            <p className="text-2xl font-bold">R$ {value}</p>
        </div>
    );
}