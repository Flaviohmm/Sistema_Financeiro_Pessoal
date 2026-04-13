interface Transaction {
    balance: number;
    income: number;
    expenses: number;
}

const Dashboard = () => {
    const data: Transaction = {
        balance: 5000,
        income: 7000,
        expenses: 2000
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Finance Dashboard</h1>

            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px"
                }}>
                    <h3>Saldo</h3>
                    <p>R$ {data.balance}</p>
                </div>
                <div style={{
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px"
                }}>
                    <h3>Receitas</h3>
                    <p>R$ {data.income}</p>
                </div>
                <div style={{
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px"
                }}>
                    <h3>Despesas</h3>
                    <p>R$ {data.expenses}</p>
                </div>
            </div>
        </div>
    );
};


export default Dashboard;